import "firebase/database";

import firebase from "firebase/app";
import { useEffect } from "react";

import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { RouteName } from "../effects/use-router/types";
import { DBPath } from "../enums/DBPath";
import { HNStory } from "../types";
import { InjectedComponentBaseProps } from "./types";
import { ActionType } from "../enums/ActionType";
import { Payload } from "../mutations";

export type TopStoriesProps = InjectedComponentBaseProps;

export default function TopStories(props: TopStoriesProps) {
  const { state, dispatch } = props.store;
  const stories = state.topStoryPage.topStoryList;

  const topStoryIds = state.app.topStoryIds;

  // const [storyIds, setStoryIds] = useState<string[]>([]);
  // const [stories, setStories] = useState<HNStory[]>([]);

  // const [modRecord, setModRecord] = useState<ModRecord>({});
  // useEffect(() => {
  //   database
  //     .ref(`/v0/${DBPath.user}/${"dang"}`)
  //     .get()
  //     .then(async (userSnap) => {
  //       const user = userSnap.val() as HNUser;
  //       const warnings = await getModeratorsComments(user);
  //       const reqs = warnings.map((warning) => getRootStory(warning.parent));
  //       const moderatedStories = await Promise.all(reqs);
  //       const ids = moderatedStories
  //         .map((story) => story?.id ?? 0)
  //         .sort(($1, $2) => ($1 > $2 ? 1 : -1));

  //       const mods = collateIds(ids, {});
  //       setModRecord(mods);
  //     });
  // }, [database]);

  // useEffect(() => {
  //   const topStoriesRef = database.ref(`/v0/${TOP_STORIES}`);
  //   props.database.topstories
  //     .getItem<HNStory[]>(TOP_STORIES)
  //     .then((stories) => stories && setStories(stories))
  //     .then(() =>
  //       topStoriesRef.on("value", (snap) => {
  //         const newStoryIds: string[] = snap.val() || [];
  //         setStoryIds(newStoryIds);
  //       })
  //     );

  //   return () => topStoriesRef?.off();
  // }, [database, props.database.topstories]);

  // -----------------------------

  // useEffect(() => {
  //   if (storyIds?.length > 0) {
  //     const refs = storyIds.map((id) =>
  //       database.ref(`/v0/${DBPath.item}/${id}`)
  //     );

  //     const requests = refs.map(
  //       (ref) =>
  //         new Promise<HNStory>((resolve) =>
  //           ref.on("value", (snap) => {
  //             const snapVal = snap.val();
  //             if (snapVal !== null) {
  //               resolve({ id: snap.key, ...snapVal });
  //               ref.off();
  //             }
  //           })
  //         )
  //     );

  //     Promise.all(requests).then((stories) => {
  //       const list = stories.slice(0, 500);
  //       props.database.topstories.setItem(TOP_STORIES, list).then(setStories);
  //     });

  //     return () => refs.forEach((ref) => ref.off());
  //   }
  // }, [storyIds, database, props.database.topstories]);

  useEffect(() => {
    const database = firebase.database();

    const topStoryRefs = topStoryIds.map((id) =>
      database.ref(`/v0/${DBPath.item}/${id}`)
    );

    const requests = topStoryRefs.map(
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
      const getRank = (id: number) => topStoryIds.indexOf(id) + 1;
      const topStoryList = stories
        .slice(0, 500)
        .map((story) => ({ rank: getRank(story.id), story }));

      const payload: Payload<ActionType.setTopStories> = {
        topStoryList,
      };

      dispatch({ type: ActionType.setTopStories, payload });

      // TODO CACHE
      // props.database.topstories.setItem(TOP_STORIES, list).then(setStories);
    });

    // TODO retrive database cache
    // props.database.topstories
    //   .getItem<HNStory[]>(DBPath.topStories)
    //   .then(() => {});

    // const topStoriesRef = database.ref(`/v0/${DBPath.topStories}`);

    // topStoriesRef.on("value", (snap) => {
    // const newStoryIds: string[] = snap.val() || [];

    // const topStoryRefs = newStoryIds.map((id) =>
    //   database.ref(`/v0/${DBPath.item}/${id}`)
    // );

    // const requests = topStoryRefs.map(
    //   (ref) =>
    //     new Promise<HNStory>((resolve) =>
    //       ref.on("value", (snap) => {
    //         const snapVal = snap.val();
    //         if (snapVal !== null) {
    //           resolve({ id: snap.key, ...snapVal });
    //           ref.off();
    //         }
    //       })
    //     )
    // );

    // // ----

    // Promise.all(requests).then((stories) => {
    //   const topStoryList = stories
    //     .slice(0, 500)
    //     .map((story) => ({ story, rank: 0 }));

    //   dispatch({
    //     type: ActionType.setTopStories,
    //     payload: { topStoryList },
    //   });

    //   // TODO CACHE
    //   // props.database.topstories.setItem(TOP_STORIES, list).then(setStories);
    // });
    // });
  }, [topStoryIds, dispatch]);

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Top Stories</h2>
      <div>
        {stories.map(
          ({ story, rank }, i) =>
            story && (
              <StoryItem
                key={i}
                rank={rank}
                story={story}
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
