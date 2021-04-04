import { State } from "./state";
import { ActionType } from "./enums/ActionType";
import { Action, HNComment, HNStory, HNUser } from "./types";

type Keys = keyof typeof ActionType;

export function reducer(state: State, action: Action<Keys>): State {
  // console.log(">>>", action.type, action.payload);

  const { type, payload } = action;

  switch (type) {
    case ActionType.initApp: {
      return { ...state, app: payload };
    }

    case ActionType.didMount:
      return { ...state, mount: payload };

    case ActionType.setModal: {
      const modal = payload as State["modal"];
      return { ...state, modal };
    }

    case ActionType.watchUid: {
      return { ...state, auth: { ...payload } };
    }

    case ActionType.emitUser: {
      return { ...state, auth: { ...state.auth, user: payload } };
    }

    case ActionType.emitNewStoryIds: {
      const newStoryIds = payload as State["newStoryIds"];
      return { ...state, newStoryIds };
    }

    case ActionType.emitTopStoryIds: {
      const topStoryIds = payload as State["topStoryIds"];
      return { ...state, topStoryIds };
    }

    case ActionType.emitNewStory: {
      return {
        ...state,
        storyRecord: { ...state.storyRecord, ...payload },
      };
    }

    case ActionType.emitTopStory: {
      return {
        ...state,
        storyRecord: { ...state.storyRecord, ...payload },
      };
    }

    case ActionType.emitSubmission: {
      return {
        ...state,
        submissionRecord: { ...state.submissionRecord, ...payload },
      };
    }

    case ActionType.emitReply: {
      return {
        ...state,
        replyRecord: { ...state.replyRecord, ...payload },
      };
    }

    case ActionType.setState: {
      return { ...state, ...payload };
    }

    default:
      throw new Error(`Reducer fallthrough: ${type}`);
  }
}
