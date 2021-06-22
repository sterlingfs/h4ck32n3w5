import { AuthStatus } from "./enums/AuthStatus";
import { NetworkStatus } from "./enums/NetworkStatus";
import { HNUser, HNComment, HNStory } from "./types";

export type State = {
  app: {
    init: boolean;
    topStoryIds: number[];
    modal: {
      position: "open" | "closed";
      name: string | null;
    };
  };
  auth: {
    status: AuthStatus;
    uid: string | null;
    user: HNUser | null;
  };
  topStoryPage: {
    topStoryList: { rank: number; story: HNStory }[];
  };
  storyPage: {
    status: NetworkStatus;
    expanded: boolean;
    comments: HNComment[];
    story: HNStory | null;
  };
  newStoryPage: {
    newStoryIds: number[];
    newStoryRecord: Record<string, HNStory>;
    newStoryList: { id: number; rank: number; story: HNStory }[];
  };
};

export const state: State = {
  app: {
    init: false,
    topStoryIds: [],
    modal: { name: null, position: "closed" },
  },
  auth: { uid: null, user: null, status: AuthStatus.unsubscribed },
  newStoryPage: {
    newStoryIds: [],
    newStoryList: [],
    newStoryRecord: {},
  },
  topStoryPage: {
    topStoryList: [],
  },
  storyPage: {
    status: NetworkStatus.init,
    story: null,
    comments: [],
    expanded: false,
  },
};
