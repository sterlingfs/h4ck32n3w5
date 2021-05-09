import { useReducer } from "react";
import { State, Action, MutationOptions, ActionType } from "../types";

export function useStore(
  mutations: Record<ActionType, (m: MutationOptions) => State>,
  initState: State
) {
  const [state, dispatch] = useReducer(
    (state: State, { type, payload }: Action) =>
      mutations[type]({ state, payload }),
    initState
  );

  return { state, dispatch };
}
