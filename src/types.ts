import { Store } from "./effects/store/types";
import { NewRoute, Route } from "./effects/use-router/types";
import { ActionType } from "./enums/ActionType";
import { EventType } from "./firebase";

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

export type Options = {
  eventType?: EventType;
};
