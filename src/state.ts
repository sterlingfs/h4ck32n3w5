import {
  HNUser,
  HNComment,
  HNStory,
  StateMutation,
  StoryListItem,
} from "./types";

export type State = {
  app: {
    init: boolean;
  };

  auth: {
    status: "init" | "awaiting" | "emitting" | "unsubscribed";
    uid?: string;
    user?: HNUser;
  };

  mount: Record<string, { active: boolean }>;

  network: {
    topStory?: { status: "init" | "awaiting" | "resolved" | "rejected" };
  };

  modal: {
    position: "open" | "closed";
    name?: string;
  };

  newStoryIds: number[];
  newStoryRecord: Record<string, HNStory>;
  newStoryList: HNStory[];

  topStoryIds: number[];
  topStoryRecord: Record<string, HNStory>;
  topStoryList: HNStory[];

  commentRecord: Record<string, HNComment>;
  submissionRecord: Record<string, HNStory | HNComment>;

  mutationHistory: StateMutation[];
};
