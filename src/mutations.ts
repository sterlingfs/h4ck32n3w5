import { State } from "./state";
import { ActionType } from "./enums/ActionType";

export type Payload<AT extends ActionType> = Parameters<Mutations[AT]>[1];

export type Mutations = {
  [ActionType.setTopStories](
    state: State,
    payload: State["topStoryPage"]
  ): State;
  [ActionType.setStory](
    state: State,
    payload: Partial<State["storyPage"]>
  ): State;
  [ActionType.setModal](state: State, payload: State["app"]["modal"]): State;
  [ActionType.watchUid](state: State, payload: State["topStoryPage"]): State;
  [ActionType.logout](state: State, payload: State["topStoryPage"]): State;
  [ActionType.setState](state: State, payload: Partial<State>): State;
  [ActionType.setTopStoryIds](
    state: State,
    payload: State["app"]["topStoryIds"]
  ): State;
};

export const mutations: Mutations = {
  [ActionType.setTopStories](state, payload) {
    return {
      ...state,
      topStoryPage: { ...state.topStoryPage, ...payload },
    };
  },

  [ActionType.setState](state, payload) {
    return { ...state, ...payload };
  },

  [ActionType.setModal](state, payload: Payload<ActionType.setModal>) {
    return { ...state, app: { ...state.app, modal: payload } };
  },

  [ActionType.watchUid](state, payload) {
    return { ...state, ...payload };
  },

  [ActionType.setStory](state, payload) {
    return { ...state, storyPage: { ...state.storyPage, ...payload } };
  },

  [ActionType.logout](state, payload) {
    return { ...state, ...payload };
  },

  [ActionType.setTopStoryIds](state, payload) {
    return { ...state, app: { ...state.app, topStoryIds: payload } };
  },
};
