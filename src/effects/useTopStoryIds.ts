import firebase from "firebase/app";
import "firebase/database";

import { useEffect } from "react";
import { Snap } from "../firebase";

export function useTopStoryIds(callback: (snap: Snap) => void) {
  useEffect(() => {
    const database = firebase.database();
    const ref = database.ref("/v0/topstories");
    ref.on("value", callback);
    return () => ref.off();
  }, [callback]);
}
