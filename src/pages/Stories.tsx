import "firebase/database";

import firebase from "firebase/app";
import { useEffect, useState } from "react";

import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { RouteName } from "../effects/use-router/RouteName";
import { State } from "../state";
import { ComponentBaseProps, HNStory, HNUser } from "../types";
import { DBPath } from "../firebase/enums/DBPath";
import { timeAgo } from "../functions/timeAgo";

export type StoriesProps = ComponentBaseProps<State>;

const TOP_STORIES = "topstories";

export default function Stories(props: StoriesProps) {
  // const { state, dispatch } = props.store;

  const topstoriesDatabase = props.database.topstories;

  const [storyIds, setStoryIds] = useState<string[]>([]);
  const [stories, setStories] = useState<HNStory[]>([]);

  useEffect(() => {
    const database = firebase.database();
    const topStoriesRef = database.ref(`/v0/${TOP_STORIES}`);

    topstoriesDatabase
      .getItem<HNStory[]>(TOP_STORIES)
      .then((stories) => stories && setStories(stories))
      .then(() =>
        topStoriesRef.on("value", (snap) => {
          const newStoryIds: string[] = snap.val() || [];
          setStoryIds(newStoryIds);
        })
      );

    return () => topStoriesRef?.off();
  }, [topstoriesDatabase]);

  useEffect(() => {
    if (storyIds?.length > 0) {
      const database = firebase.database();
      const refs = storyIds.map((id) =>
        database.ref(`/v0/${DBPath.item}/${id}`)
      );

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

      Promise.all(requests).then((stories) => {
        const list = stories.slice(0, 200);
        topstoriesDatabase.setItem(TOP_STORIES, list).then(setStories);
      });

      return () => refs.forEach((ref) => ref.off());
    }
  }, [storyIds, topstoriesDatabase]);

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Top Stories</h2>
      <div>
        {stories.map((story, i) => (
          <StoryItem
            key={i}
            index={i + 1}
            story={story}
            timeAgo={timeAgo(story!.time ?? Date.now() / 1000)}
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
