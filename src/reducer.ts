import { State } from "./state";
import { Action } from "./effects/store/types";
import { ActionType } from "./enums/ActionType";
import { HNComment, HNStory, HNUser } from "./types";

type Keys = keyof typeof ActionType;

export function reducer(state: State, action: Action<Keys>): State {
  // console.log(">>>", action.type, action.payload);

  const { type, payload } = action;

  switch (type) {
    case ActionType.didMount:
      return { ...state, mount: payload };

    case ActionType.initApp: {
      return { ...state, app: payload };
    }

    case ActionType.getUser: {
      const user = payload as HNUser;
      return { ...state, user };
    }

    case ActionType.setModal: {
      const modal = payload as State["modal"];
      return { ...state, modal };
    }

    case ActionType.emitTopStoryIds: {
      const topStoryIds = payload as State["topStoryIds"];
      return { ...state, topStoryIds };
    }

    case ActionType.emitTopStory: {
      const storyRecord = payload as Record<string, HNStory>;
      return {
        ...state,
        topStoryRecord: { ...state.topStoryRecord, ...storyRecord },
      };
    }

    case ActionType.emitSubmission: {
      const submissionRecord = payload as Record<string, HNStory>;
      return {
        ...state,
        submissionRecord: { ...state.submissionRecord, ...submissionRecord },
      };
    }

    case ActionType.emitReply: {
      const replyRecord = payload as Record<string, HNComment>;
      return {
        ...state,
        replyRecord: { ...state.replyRecord, ...replyRecord },
      };
    }

    case ActionType.setState: {
      return { ...state, ...payload };
    }

    default:
      throw new Error(`Reducer fallthrough: ${type}`);
  }
}
