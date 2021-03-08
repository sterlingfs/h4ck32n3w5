import { useEffect, useReducer } from "react";

import * as localForage from "localforage";
import { State } from "../types";

const initState = {
  user: {},
  modal: { position: "closed" },
} as State;

export function useLocalStorage() {
  const [state, dispatch] = useReducer(
    (a: State, c: Partial<State>) => ({ ...a, ...c }),
    initState
  );

  useEffect(() => {
    const entries = Object.keys(state);

    entries.forEach((k) => {
      localForage.getItem(k).then((item) => item && dispatch({ [k]: item }));
    });
  }, [state, dispatch]);

  return state;
}
