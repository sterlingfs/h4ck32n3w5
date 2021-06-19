import "firebase/database";

import { useEffect } from "react";

export function useWatchUid<Store>(uid: string | undefined, store: Store) {
  useEffect(() => {
    // if (uid) {
    //   const ref = firebase.database().ref(`/v0/user/${uid}`);
    //   ref.on("value", (snap) =>
    //     localforage
    //       .setItem("auth", { uid, user: snap.val() })
    //       .then((payload) => dispatch({ type: ActionType.getUser, payload }))
    //   );
    // } else {
    //   localforage.removeItem("auth");
    // }
  }, [uid, store]);
}
