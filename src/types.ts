import { NewRoute, Route } from "./effects/use-router/types";
import { ActionType } from "./enums/ActionType";
import { EventType } from "./firebase";
import { State } from "./state";

export type Store<State, Keys extends string> = {
  state: State;
  dispatch: (action: Action<Keys>) => void;
};

export type Action<Keys extends string> = {
  type: Keys;
  payload?: any;
};

export type ActionOptions<State, Keys extends string> = {
  state: State;
  commit: React.Dispatch<Action<Keys>>;
  dispatch: React.Dispatch<Action<Keys>>;
};

export type ActionFunction<State, Keys extends string> = (
  options: ActionOptions<State, Keys>,
  payload: any
) => Promise<any>;

export type MutationFunction<State> = (state: State, payload: any) => State;

export type ComponentBaseProps<State> = {
  store: Store<State, keyof typeof ActionType>;
  router: { route?: Route; setRoute: (newRoute: NewRoute) => void };
};

export type HNStory = {
  id: number;
  by: string;
  time: number;
  kids: number[];

  descendants: number;
  score: number;
  title: string;
  url: string;
  type: "story";
};

export type HNComment = {
  text: string;
  parent: number;
  type: "comment";
  time: number;

  id: number;
  by: string;
  kids: number[];
};

export type HNUser = {
  id: string;
  created: number;
  karma: number;
  about: string;
  submitted: number[];
};

export type StateMutation = {
  action: Action<keyof typeof ActionType>;
  state: State;
};
export type Options = {
  eventType?: EventType;
};
