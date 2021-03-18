import { Store } from "./effects/store/types";
import { NewRoute, Route } from "./effects/use-router/types";
import { ActionType } from "./enums/ActionType";
import { EventType } from "./firebase";

export type State = {
  app: { init: boolean };
  // mount: {},
  modal: {
    position: "open" | "closed";
    name?: string;
  };
  user?: User;

  itemRecord: Record<string, Item>;

  // topStories?: ItemMap<Story>;
  // topStoryIds?: number[];
  // topStoriesOrderedList?: Story[];
  // commentStream?: Comment[];
};

export type Item = Story | Comment;

export type ItemMap<T> = { [key: string]: T };

export type BaseProps = {
  store: Store<State, keyof typeof ActionType>;
  router: { route?: Route; setRoute: (newRoute: NewRoute) => void };
};

export type BaseItem = {
  id: number;
  by: string;
  time: number;
  kids: number[];
  type: "story" | "comment" | "job" | "poll";
};

export type Story = BaseItem & {
  descendants: number;
  score: number;
  title: string;
  url: string;
};

export type Comment = BaseItem & {
  text: string;
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
