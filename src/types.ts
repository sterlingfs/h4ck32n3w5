import { NewRoute, Route } from "./effects/use-router/types";
import { ActionType } from "./enums/ActionType";
import { EventType } from "./firebase";
import { State } from "./state";

export type Data<S = HNItem> = { index: number; item: S };

export type Dispatch = React.Dispatch<Action<ActionType>>;

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
  store: Store<State, ActionType>;
  router: { route?: Route; setRoute: (newRoute: NewRoute) => void };

  [key: string]: any;
};

export type HNStory = {
  by: string;
  descendants: number;
  firstComment: HNComment;
  id: number;
  index: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

export type HNComment = {
  by: string;
  firstComment: HNComment;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
};

export type HNItem = HNStory | HNComment;

export type HNUser = {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
};

export type StateMutation = {
  action: Action<ActionType>;
  state: State;
};

export type Options = {
  eventType?: EventType;
};

export type StoryListItem = {
  story: HNStory;
  index: number;
};
