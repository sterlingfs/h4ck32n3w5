import "firebase/database";

import firebase from "firebase/app";
import * as localforage from "localforage";
import { useEffect, useState } from "react";

import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { RouteName } from "../effects/use-router/RouteName";
import { HNStory } from "../types";
import { ComponentBaseProps } from "./types";

export type LatestProps = ComponentBaseProps;

const LATEST_STORY_LIST = "latestStoryList";

export default function Latest(props: LatestProps) {
  // const { state, dispatch } = props.store;
  const [storyIds, setStoryIds] = useState<string[]>([]);
  const [stories, setStories] = useState<HNStory[]>([]);

  useEffect(() => {
    const database = firebase.database();
    const newStoriesRef = database.ref("/v0/newstories");

    localforage
      .getItem<HNStory[]>(LATEST_STORY_LIST)
      .then((stories) => stories && setStories(stories))
      .then(() =>
        newStoriesRef.on("value", (snap) => {
          const newStoryIds: string[] = snap.val() || [];
          setStoryIds(newStoryIds);
        })
      );

    return () => newStoriesRef?.off();
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
          .setItem(
            LATEST_STORY_LIST,
            stories
              .sort(($0, $1) => {
                return $0.time < $1.time ? 1 : -1;
              })
              .slice(0, 500)
          )
          .then(setStories)
      );

      return () => refs.forEach((ref) => ref.off());
    }
  }, [storyIds]);

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Latest News</h2>
      <div>
        {stories.map((story, i) => (
          <StoryItem
            rank={i}
            story={story}
            shouldPushComments={() => {
              props.router.setRoute({
                name: RouteName.story,
                params: { storyId: story.id },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
