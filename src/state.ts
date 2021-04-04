import { HNUser, HNComment, HNStory, StateMutation } from "./types";

export type State = {
  app: {
    init: boolean;
  };

  auth: {
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
  newStoryList: HNStory[];

  topStoryIds: number[];
  topStoryList: HNStory[];

  storyRecord: Record<string, HNStory>;

  submissionRecord: Record<string, HNStory | HNComment>;
  replyRecord: Record<string, HNComment>;

  mutationHistory: StateMutation[];
};
