import React, { useReducer } from "react";
import { ActionFunction, MutationFunction, Store, Action } from "./types";

export type RouterOptions<State, Keys extends string> = {
  initState: State;
  initializer: (state: State) => State;
  actions: Record<Keys, ActionFunction<State, Keys>>;
  mutations: Record<Keys, MutationFunction<State>>;
  getters?: {};
};

export function useStore<State, Keys extends string>(
  options: RouterOptions<State, Keys>
): Store<State, Keys> {
  const [state, commit] = useReducer(
    (state: State, { type, payload }: Action<Keys>) => {
      const mutationFunction = options.mutations[type];
      if (mutationFunction) {
        const newState = mutationFunction(state, payload);
        // console.group(">>> Dispatch:", type);
        // console.log("payload:", "   ", payload);
        // console.log("state:", "     ", state);
        // console.log("new state:", " ", newState);
        // console.groupEnd();
        return newState;
      } else {
        throw new Error(`Mutation function not found: ${type}`);
      }
    },
    options.initState,
    (state) => {
      return state;
    }
  );

  return { state, dispatch: dispatchWrapper(options, state, commit) };
}

// Public api wrapper around useReducer.dispatch
const dispatchWrapper = <State, Keys extends string>(
  options: RouterOptions<State, Keys>,
  state: State,
  commit: React.Dispatch<Action<Keys>>
) => async (action: Action<Keys>): Promise<any> => {
  const actionFunction = options.actions[action.type];
  if (actionFunction) {
    return actionFunction(
      { state, commit, dispatch: dispatchWrapper(options, state, commit) },
      action.payload
    );
  } else {
    throw new Error(`Function for action type not found: ${action.type}`);
  }
};
