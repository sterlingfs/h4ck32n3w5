import firebase from "firebase/app";
import "firebase/database";

import * as localforage from "localforage";
import { useEffect, useState } from "react";

import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { RouteName } from "../effects/use-router/RouteName";
import { State } from "../state";
import { ComponentBaseProps, HNStory } from "../types";

export type StoriesProps = ComponentBaseProps<State>;

export default function Stories(props: StoriesProps) {
  // const { state, dispatch } = props.store;
  const [storyIds, setStoryIds] = useState<string[]>([]);
  const [stories, setStories] = useState<HNStory[]>([]);

  useEffect(() => {
    const database = firebase.database();
    const topStoriesRef = database.ref("/v0/topstories");

    localforage
      .getItem<HNStory[]>("topStoryList")
      .then((stories) => stories && setStories(stories))
      .then(() =>
        topStoriesRef.on("value", (snap) => {
          const newStoryIds: string[] = snap.val() || [];
          setStoryIds(newStoryIds);
        })
      );

    return () => topStoriesRef?.off();
  }, []);

  useEffect(() => {
    if (storyIds?.length > 0) {
      const database = firebase.database();
      const refs = storyIds.map((id) => database.ref(`/v0/item/${id}`));

      const requests = refs.map(
        (ref) =>
          new Promise<HNStory>((resolve) =>
            ref.on("value", (snap) => {
              const snapVal = snap.val();
              if (snapVal !== null) {
                resolve({ id: snap.key, ...snapVal });
                ref.off();
              }
            })
          )
      );

      Promise.all(requests).then((stories) =>
        localforage
          .setItem("topStoryList", stories.slice(0, 200))
          .then(setStories)
      );

      return () => refs.forEach((ref) => ref.off());
    }
  }, [storyIds]);

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Top Stories</h2>
      <div>
        {stories.map((story, i) => (
          <StoryItem
            key={i}
            index={i}
            story={story}
            shouldPushComments={() => {
              props.router.setRoute({
                name: RouteName.comments,
                params: { storyId: story.id },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
