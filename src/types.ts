import { Store } from "./effects/store/useStore";
import { NewRoute, Route } from "./effects/use-router/types";
import { EventType } from "./firebase";

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

export type BaseProps = {
  store: Store<State>;
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
