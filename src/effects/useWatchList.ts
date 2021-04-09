import { useEffect } from "react";
import { ActionType } from "../enums/ActionType";
import { Snap } from "../firebase";
import { DBPath } from "../firebase/enums/DBPath";
import { getItem } from "../firebase/getItem";
import { State } from "../state";
import { Dispatch, HNStory } from "../types";

/**
 * Args
 * - id
 * - action type
 * -
 */
export function useWatchList(
  { ids, type }: { ids: number[]; type: ActionType },
  dispatch: Dispatch
) {
  useEffect(() => {
    if (ids && type) {
      const snapsReq = ids.map((id) => {
        return new Promise<Snap>((r) => getItem({ id, path: DBPath.item }, r));
      });

      Promise.allSettled(snapsReq).then((res) => {
        const vals = res
          .map((req: any) => req.value.val())
          .filter((el) => el !== undefined);

        if (vals) {
          const entries = vals.map((story) => [story?.id, story]);
          const record = Object.fromEntries(entries);
          dispatch({ type, payload: record });
        }
      });
    }
  }, [ids, type, dispatch]);
}
