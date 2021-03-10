import firebase from "firebase/app";
import "firebase/database";
import { NewRoute, Route } from "./effects/use-router/types";

export type EventType = firebase.database.EventType;
export type Snap = firebase.database.DataSnapshot;

export enum DBPath {
  item = "item",
  user = "user",
}

export enum ActionType {
  initApp = "app",
  setModal = "modal",
  getUser = "getUser",
}

export enum RouteName {
  root = "root",
  stories = "stories",
  replies = "replies",
  comments = "comments",
}

export type Modal = {
  position: "open" | "closed";
  name?: string;
};

export type State = {
  app: { init: boolean };
  modal: Modal;
  user?: User;

  // topStories?: ItemMap<Story>;
  // topStoryIds?: number[];
  // topStoriesOrderedList?: Story[];
  // commentStream?: Comment[];
};

export type Item = Story | Comment;

export type ItemMap<T> = { [key: string]: T };

export type Action<T = any> = {
  type: ActionType;
  payload: T;
};

export type Store = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export type BaseProps = {
  store: Store;
  router: { route?: Route; setRoute: (newRoute: NewRoute) => void };
};

export type BaseItem = {
  id: number;
  by: string;
  time: number;
  type: "story" | "comment" | "job" | "poll";
};

export type Story = BaseItem & {
  descendants: number;
  kids: number[];
  score: number;
  title: string;
  url: string;
};

export type Comment = BaseItem & {
  text: string;
  kids: number[];
  parent: number;
};

export type User = {
  id: string;
  created: number;
  karma: number;
  about: string;
  submitted: number[];
};

export type Options = {
  eventType?: EventType;
};
