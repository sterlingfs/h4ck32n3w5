import { useEffect } from "react";

import * as localForage from "localforage";
import { State } from "../types";

export function useSetLocalStorage(state: Partial<State>) {
  const entries = Object.entries(state);

  useEffect(() => {
    entries.forEach(([k, v]) => {
      k && v && localForage.setItem(k, v);
    });
  }, [entries]);

  return state;
}
