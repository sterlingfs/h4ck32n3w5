import { useEffect } from "react";

import firebase from "firebase/app";
import "firebase/database";

import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { RouteName } from "../effects/use-router/RouteName";
import { ActionType } from "../enums/ActionType";
import { getItem } from "../firebase";
import { DBPath } from "../firebase/enums/DBPath";
import { State } from "../state";
import { ComponentBaseProps } from "../types";

export type LatestProps = ComponentBaseProps<State>;

export default function Latest(props: LatestProps) {
  const { state, dispatch } = props.store;

  useEffect(() => {
    const db = firebase.database();
    const newStoriesRef = db.ref("/v0/newstories");

    newStoriesRef.on("value", (snap) => {
      const newStoryIds: string[] = snap.val() || [];
      console.log(
        "new stories",
        newStoryIds[0],
        new Date().toLocaleTimeString()
      );

      const snapsReqList = newStoryIds.map(async (id, index) => {
        // FIXME the latest items are returning null
        // TODO leave open the query to each id

        const item = await getItem({ id, path: DBPath.item })?.catch((err) => {
          console.log(">>> FAIL STORY FETCH", err);
        });
        return { index, item: item && item.val(), id };
      });

      Promise.all(snapsReqList).then((list) => {
        const newStoryList = list;

        dispatch({
          type: ActionType.setState,
          payload: { newStoryList },
        });
      });
    });

    return newStoriesRef.off;
  }, [dispatch]);

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Latest News</h2>
      <div>
        {state.newStoryList.map((data, i) => (
          <StoryItem
            key={i}
            index={i}
            id={data.id}
            story={data.item}
            shouldPushComments={() => {
              props.router.setRoute({
                name: RouteName.comments,
                params: { storyId: data.item.id },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
