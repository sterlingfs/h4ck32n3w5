import { useEffect } from "react";
import { ActionType } from "../enums/ActionType";
import { DBPath } from "../firebase/enums/DBPath";
import { getItem } from "../firebase/getItem";
import { Dispatch } from "../types";

/**
 * Args
 * - id
 * - action type
 * -
 */
export function useWatchList(
  args: { ids: number[]; type: ActionType },
  dispatch: Dispatch
) {
  useEffect(() => {
    const snaps = args.ids.map((id) => {
      return getItem({ id, path: DBPath.item }, (snap) => {
        dispatch({
          type: args.type,
          payload: snap,
        });
      });
    });

    return () => snaps.forEach((snap) => snap.ref.off());
  }, [args, dispatch]);
}
