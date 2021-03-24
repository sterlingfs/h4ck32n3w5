import { Action } from "./effects/store/types";
import { ActionType } from "./enums/ActionType";
import { HNUser, HNComment, HNStory } from "./types";

export type State = {
  actionHistory: { action: Action<keyof typeof ActionType>; state: State }[];
  app: { init: boolean };
  mount: Record<string, { active: boolean }>;

  modal: {
    position: "open" | "closed";
    name?: string;
  };
  user?: HNUser;

  topStoryIds: number[];
  topStoryOrderedList: any[];
  topStoryRecord: Record<string, HNStory>;

  submissionRecord: Record<string, HNStory | HNComment>;
  replyRecord: Record<string, HNComment>;

  // topStories?: ItemMap<Story>;
  // topStoryIds?: number[];
  // topStoriesOrderedList?: Story[];
  // commentStream?: Comment[];
};
