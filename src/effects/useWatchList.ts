import { useEffect } from "react";
import { ActionType } from "../enums/ActionType";
import { DBPath } from "../firebase/enums/DBPath";
import { getItem } from "../firebase/getItem";
import { Dispatch } from "../types";

export function useWatchList(ids: number[], dispatch: Dispatch) {
  useEffect(() => {
    const snaps = ids.map((id) => {
      return getItem({ id, path: DBPath.item }, (snap) => {
        dispatch({
          type: ActionType.emitStory,
          payload: snap,
        });
      });
    });

    return () => snaps.forEach((snap) => snap.ref.off());
  }, [ids, dispatch]);
}
