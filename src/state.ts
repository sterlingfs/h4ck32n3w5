import { AuthStatus } from "./enums/AuthStatus";
import { ModalName } from "./enums/ModalName";
import { ModalPosition } from "./enums/ModalPosition";
import { NetworkStatus } from "./enums/NetworkStatus";
import { HNUser, HNStory, CommentEntry } from "./types";

export type State = {
  app: {
    init: boolean;
    topStoryIds: number[];
    modal: {
      position: ModalPosition;
      name: ModalName;
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
    comments: CommentEntry[];
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
    modal: { name: ModalName.unset, position: ModalPosition.closed },
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
