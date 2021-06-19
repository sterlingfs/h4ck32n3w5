import { State } from "./state";
import { ActionType } from "./enums/ActionType";

export const mutations = {
  [ActionType.emitTopStory](state: State, payload: State["topStoryPage"]) {
    return {
      ...state,
      topStoryPage: { ...state.topStoryPage, ...payload },
    };
  },

  [ActionType.setState](state: State, payload: Partial<State>) {
    return {
      ...state,
      ...payload,
    };
  },

  [ActionType.setModal](state: State, payload: any) {
    return state;
  },

  [ActionType.getUser](state: State, payload: any) {
    return state;
  },

  [ActionType.getStory](state: State, payload: any) {
    return state;
  },
};
