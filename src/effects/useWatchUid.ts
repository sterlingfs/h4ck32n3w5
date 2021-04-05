import React, { useEffect } from "react";
import firebase from "firebase";
import * as localforage from "localforage";

import { ActionType } from "../enums/ActionType";
import { State } from "../state";
import { Action } from "../types";

export type UserWatchUidProps = Pick<State["auth"], "status" | "uid">;

export function useWatchUid(
  props: UserWatchUidProps,
  dispatch: React.Dispatch<Action<ActionType>>
) {
  useEffect(() => {
    const { uid, status } = props;

    if (status === "init" && uid) {
      dispatch({ type: ActionType.awaitingUser });

      const ref = firebase.database().ref(`/v0/user/${uid}`);
      ref.on("value", (snap) =>
        localforage
          .setItem("auth", { ...props, user: snap.val() })
          .then((payload) => dispatch({ type: ActionType.emitUser, payload }))
      );

      return ref.off;
    } else if (status === "unsubscribed") {
      localforage.setItem("auth", props);
    }
  }, [props, dispatch]);
}
