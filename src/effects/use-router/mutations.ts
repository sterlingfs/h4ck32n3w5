import { ActionType, MutationOptions, State } from "./types";

export const mutations: Record<ActionType, (m: MutationOptions) => State> = {
  [ActionType.pushPathname]({ state, payload }) {
    return { ...state, route: payload };
  },

  [ActionType.setRoute]({ state, payload }) {
    return { ...state, route: payload };
  },

  [ActionType.pushState]({ state, payload }) {
    return { ...state, history: [...state.history, payload] };
  },

  [ActionType.popState]({ state, payload }) {
    return { ...state, history: [...state.history, payload] };
  },
};
