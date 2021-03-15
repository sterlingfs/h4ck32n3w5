import React, { useReducer } from "react";
import * as localForage from "localforage";
import { ActionFunction, MutationFunction, Store, Action } from "./types";

export function useStore<State, Keys extends string>(options: {
  initState: State;
  actions: Record<Keys, ActionFunction<State, Keys>>;
  mutations: Record<Keys, MutationFunction<State, Keys>>;
  getters?: {};
}): Store<State, Keys> {
  const [state, commit] = useReducer(
    (state: State, { type, payload }: Action<Keys>) => {
      console.log(">>> Dispatch", type, payload);
      // Cache to idb
      localForage.setItem(type, payload);
      // Return state
      const mutationFunction = options.mutations[type];
      if (mutationFunction) {
        return mutationFunction(state, { type, payload });
      } else {
        throw new Error(`Mutation function not found: ${type}`);
      }
    },
    options.initState
  );

  // Public api wrapper around useReducer.dispatch
  const dispatchWrapper = (
    state: State,
    commit: React.Dispatch<Action<Keys>>
  ) => async (action: Action<Keys>): Promise<any> => {
    const actionFunction = options.actions[action.type];
    if (actionFunction) {
      return actionFunction({ state, commit }, action.payload);
    } else {
      throw new Error(`Function for action type not found: ${action.type}`);
    }
  };

  return { state, dispatch: dispatchWrapper(state, commit) };
}
