import firebase from "firebase";
import React, { useEffect } from "react";
import * as localForage from "localforage";
import { ActionType } from "../enums/ActionType";
import { Action } from "../types";

export function useAppInit(dispatch: React.Dispatch<Action<ActionType>>) {
  useEffect(() => {
    localForage
      .iterate((value, key) => {
        dispatch({ type: ActionType.setState, payload: { [key]: value } });
      })
      .then(() => {
        const db = firebase.database();

        /**
         * Watch topStories and emit id list
         */
        const topStoriesRef = db.ref("/v0/topstories");
        topStoriesRef.on("value", (snap) =>
          dispatch({ type: ActionType.emitTopStoryIds, payload: snap.val() })
        );

        /**
         * Watch new story ids and emit id list
         */
        const newStoriesRef = db.ref("/v0/newstories");
        newStoriesRef.on("value", (snap) =>
          dispatch({ type: ActionType.emitNewStoryIds, payload: snap.val() })
        );

        return () => {
          newStoriesRef.off();
          topStoriesRef.off();
        };
      });
  }, [dispatch]);
}
