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
      return { ...state, auth: { ...payload, status: "init" } };
    }

    case ActionType.awaitingUser: {
      return { ...state, auth: { ...state.auth, status: "awaiting" } };
    }

    case ActionType.emitUser: {
      return {
        ...state,
        auth: { status: "emitting", ...payload },
      };
    }

    case ActionType.releaseUid: {
      return { ...state, auth: { status: "unsubscribed" } };
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
        newStoryRecord: {
          ...state.newStoryRecord,
          [payload.key]: payload.val(),
        },
      };
    }

    case ActionType.emitTopStory: {
      return {
        ...state,
        topStoryRecord: {
          ...state.topStoryRecord,
          [payload.key]: payload.val(),
        },
      };
    }

    case ActionType.setNewStoryRecord: {
      return { ...state, newStoryRecord: payload };
    }

    case ActionType.setTopStoryRecord: {
      return { ...state, topStoryRecord: payload };
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
        commentRecord: { ...state.commentRecord, ...payload },
      };
    }

    case ActionType.setState: {
      return { ...state, ...payload };
    }

    default:
      throw new Error(`Reducer fallthrough: ${type}`);
  }
}
