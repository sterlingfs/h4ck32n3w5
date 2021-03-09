import firebase from "firebase/app";
import "firebase/database";

export type EventType = firebase.database.EventType;
export type Snap = firebase.database.DataSnapshot;

export enum DBPath {
  item = "item",
  user = "user",
}

export enum ActionType {
  app = "app",
  user = "user",
  modal = "modal",
}

export enum RouteName {
  root = "root",
  stories = "stories",
  replies = "replies",
}

export type Modal = {
  position: "open" | "closed";
  name?: string;
};

export type State = {
  app: { init: boolean };
  modal: Modal;
  user?: User;
  topStories?: ItemMap<Story>;
  topStoryIds?: number[];
  topStoriesOrderedList?: Story[];
  commentStream?: [key: string, val: Comment][];
};

// export enum DBCollection {
//   topstories = "topstories",
//   newstories = "newstories",
//   beststories = "beststories",
// }

export type Item = Story | Comment;

export type ItemMap<T> = { [key: string]: T };

export type Action = {
  type: ActionType;
  payload: unknown;
};

export type Store = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export type BaseProps = {
  store: Store;
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
