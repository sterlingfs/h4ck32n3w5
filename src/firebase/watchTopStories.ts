import firebase from "firebase/app";
import "firebase/firestore";
import React from "react";

import { Snap } from ".";
import { Story } from "../types";

export type Unsubscribe = () => void;

export function watchTopStories(
  ids: number[],
  dispatch: (record: Record<string, Story>) => void
): Unsubscribe {
  const database = firebase.database();
  const itemRef = (id: number) => database.ref(`/v0/item/${id}`);

  const unsub = ids.slice(0, 99).map((id) => {
    const ref = itemRef(id);
    const callback = (snap: Snap) => dispatch({ [id]: snap.val() });
    ref.on("value", callback);
    return ref;
  });

  return () =>
    unsub.forEach(({ ref }) => {
      ref.off();
    });
}
