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
import { getModeratorsComments } from "../functions/getModeratorsComments";
import { getRootStory } from "../functions/getRootStory";
import { collateIds, ModRecord } from "../functions/collateIds";

export type StoriesProps = ComponentBaseProps<State>;

const TOP_STORIES = "topstories";

export default function Stories(props: StoriesProps) {
  const database = firebase.database();

  const [storyIds, setStoryIds] = useState<string[]>([]);
  const [stories, setStories] = useState<HNStory[]>([]);
  const [modRecord, setModRecord] = useState<ModRecord>({});

  useEffect(() => {
    database
      .ref(`/v0/${DBPath.user}/${"dang"}`)
      .get()
      .then(async (userSnap) => {
        const user = userSnap.val() as HNUser;
        const warnings = await getModeratorsComments(user);
        const reqs = warnings.map((warning) => getRootStory(warning.parent));
        const moderatedStories = await Promise.all(reqs);
        const ids = moderatedStories
          .map((story) => story?.id ?? 0)
          .sort(($1, $2) => ($1 > $2 ? 1 : -1));

        const mods = collateIds(ids, {});
        setModRecord(mods);
      });
  }, [database]);

  useEffect(() => {
    const topStoriesRef = database.ref(`/v0/${TOP_STORIES}`);
    props.database.topstories
      .getItem<HNStory[]>(TOP_STORIES)
      .then((stories) => stories && setStories(stories))
      .then(() =>
        topStoriesRef.on("value", (snap) => {
          const newStoryIds: string[] = snap.val() || [];
          setStoryIds(newStoryIds);
        })
      );

    return () => topStoriesRef?.off();
  }, [database, props.database.topstories]);

  useEffect(() => {
    if (storyIds?.length > 0) {
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
        const list = stories.slice(0, 500);
        props.database.topstories.setItem(TOP_STORIES, list).then(setStories);
      });

      return () => refs.forEach((ref) => ref.off());
    }
  }, [storyIds, database, props.database.topstories]);

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Top Stories</h2>
      <div>
        {stories.map(
          (story, i) =>
            story && (
              <StoryItem
                key={i}
                index={i + 1}
                story={story}
                timeAgo={timeAgo(story!.time ?? Date.now() / 1000)}
                shouldPushComments={() => {
                  props.router.setRoute({
                    name: RouteName.story,
                    params: { storyId: story.id },
                  });
                }}
              />
            )
        )}
      </div>
    </div>
  );
}
