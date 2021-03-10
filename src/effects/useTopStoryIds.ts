import firebase from "firebase/app";
import "firebase/database";

import { useState, useEffect } from "react";
import { Snap } from "../types";

export function useTopStoryIds() {
  const [topStoryIds, setTopStoryIds] = useState<number[]>([]);

  useEffect(() => {
    const database = firebase.database();
    const ref = database.ref("/v0/topstories");
    const cb = (snap: Snap) => setTopStoryIds(snap.val());
    ref.on("value", cb);
    return () => ref.off();
  }, []);

  return topStoryIds;
}
