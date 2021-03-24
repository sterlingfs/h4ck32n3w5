import firebase from "firebase/app";
import "firebase/database";

import { useEffect, useReducer } from "react";
import { Snap } from "../firebase";
import { HNStory } from "../types";

type StoryMap = Record<string, HNStory>;

export function useTopStories(ids: number[]): StoryMap {
  const [topStories, setTopStories] = useReducer((a: StoryMap, c: StoryMap) => {
    return { ...a, ...c };
  }, {});

  useEffect(() => {
    const database = firebase.database();
    const itemRef = (id: number) => database.ref(`/v0/item/${id}`);

    const unsub = ids.slice(0, 99).map((id) => {
      const ref = itemRef(id);
      const callback = (snap: Snap) => setTopStories({ [id]: snap.val() });
      ref.on("value", callback);
      return ref;
    });

    return () =>
      unsub.forEach(({ ref }) => {
        console.log("dealloc");
        ref.off();
      });
  }, [ids, setTopStories]);

  return topStories;
}
