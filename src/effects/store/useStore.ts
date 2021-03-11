import { useReducer } from "react";
import * as localForage from "localforage";

export type Action = {
  type: string;
  payload: any;
};

export type Store<State> = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export function useStore<State>(
  reducer: (state: State, action: Action) => State,
  initState: State
): Store<State> {
  const [state, dispatch] = useReducer(
    (state: State, { type, payload }: Action) => {
      console.log(">>> Dispatch", type, payload);

      localForage.setItem(type, payload);

      return reducer(state, { type, payload });
    },
    initState
  );

  return { state, dispatch };
}
