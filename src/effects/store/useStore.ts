import React, { useReducer } from "react";
import * as localForage from "localforage";

export type Action = {
  type: string;
  payload?: any;
};

export type Store<State> = {
  state: State;
  dispatch: (action: Action) => void;
};

export type ActionOptions<State> = {
  state: State;
  commit: React.Dispatch<Action>;
};

export type ActionFunction<State> = (
  options: ActionOptions<State>,
  payload: any
) => void;

export type MutationFunction<State> = (state: State, action: Action) => State;

export function useStore<State>(options: {
  initState: State;
  actions: Record<string, ActionFunction<State>>;
  mutations: Record<string, MutationFunction<State>>;
}): Store<State> {
  const [state, commit] = useReducer(
    (state: State, { type, payload }: Action) => {
      console.log(">>> Dispatch", type, payload);
      localForage.setItem(type, payload);

      return options.mutations[type](state, { type, payload });
    },
    options.initState
  );

  const dispatch = async (action: Action) => async (state: State) => {
    const actionFunction = options.actions[action.type];
    return actionFunction({ state, commit }, action.payload);
  };

  // pass args to the action function

  return { state, dispatch };
}
