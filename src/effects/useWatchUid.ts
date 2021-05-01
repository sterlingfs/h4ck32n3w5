import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import * as localforage from "localforage";

import { ActionType } from "../enums/ActionType";
import { State } from "../state";
import { Action } from "../types";

export type UserWatchUidProps = Pick<State["auth"], "status" | "uid">;

export function useWatchUid(
  uid: string | undefined,
  dispatch: React.Dispatch<Action<ActionType>>
) {
  useEffect(() => {
    if (uid) {
      dispatch({ type: ActionType.awaitingUser });

      const ref = firebase.database().ref(`/v0/user/${uid}`);
      ref.on("value", (snap) =>
        localforage
          .setItem("auth", { uid, user: snap.val() })
          .then((payload) => dispatch({ type: ActionType.emitUser, payload }))
      );
    } else {
      localforage.removeItem("auth");
    }
  }, [uid, dispatch]);
}
