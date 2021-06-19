import { AuthStatus } from "./enums/AuthStatus";
import { HNUser, HNComment, HNStory } from "./types";

export type State = {
  app: {
    init: boolean;
    modal: {
      position: "open" | "closed";
      name?: string;
    };
  };
  auth: {
    status: AuthStatus;
    uid?: string;
    user?: HNUser;
  };
  topStoryPage: {
    topStoryIds: number[];
    topStoryList: { id: number; rank: number; story: HNStory }[];
  };
  storyPage: {
    expanded: boolean;
    comments?: HNComment[];
    story?: HNStory;
  };
  newStoryPage: {
    newStoryIds: number[];
    newStoryRecord: Record<string, HNStory>;
    newStoryList: { id: number; rank: number; story: HNStory }[];
  };
};

export const state: State = {
  app: { init: false, modal: { position: "closed" } },
  auth: { status: AuthStatus.unsubscribed },
  newStoryPage: {
    newStoryIds: [],
    newStoryList: [],
    newStoryRecord: {},
  },
  topStoryPage: {
    topStoryIds: [],
    topStoryList: [],
  },
  storyPage: { expanded: false },
};
