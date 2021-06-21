import React, { useReducer } from "react";

export type Action<ActionType> = {
  type: ActionType;
  payload?: any;
};

export type ReducerFunction<State> = (state: State, payload?: any) => State;

export type Store<ActionType, State> = {
  state: State;
  dispatch: React.Dispatch<Action<ActionType>>;
  actions?: any;
};

export function useStore<ActionType extends string, State>(opts: {
  initState: State;
  mutations: Record<ActionType, ReducerFunction<State>>;
}): Store<ActionType, State> {
  const [state, dispatch] = useReducer(
    (state: State, action: Action<ActionType>) => {
      const newState = opts.mutations[action.type](state, action.payload);

      if (window.location.hostname === "localhost") {
        console.group(action.type);
        console.log({ payload: action.payload });
        console.log({ state: newState });
        console.groupEnd();
      }

      return newState;
    },
    opts.initState
  );

  return {
    state,
    dispatch,
  };
}
