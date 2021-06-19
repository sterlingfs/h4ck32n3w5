import firebase from "firebase/app";
import "firebase/database";

import { useEffect } from "react";

export function useAppInit() {
  useEffect(() => {
    const db = firebase.database();
    const newStoriesRef = db.ref("/v0/newstories");
    const topStoriesRef = db.ref("/v0/topstories");

    // const fetchIds = () => {
    //   topStoriesRef.on("value", (snap) => {
    //     dispatch({ type: ActionType.emitTopStoryIds, payload: snap.val() });
    //   });
    //   newStoriesRef.on("value", (snap) =>
    //     dispatch({ type: ActionType.emitNewStoryIds, payload: snap.val() })
    //   );
    // };

    // if (localForage.keys.length > 0) {
    //   localForage
    //     .iterate((value, key) => {
    //       dispatch({ type: ActionType.setState, payload: { [key]: value } });
    //     })
    //     .then(() => fetchIds());
    // } else {
    //   fetchIds();
    // }

    // fetchIds();

    return () => {
      newStoriesRef.off();
      topStoriesRef.off();
    };
  }, []);
}
