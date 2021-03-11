import { ActionType } from "../enums/ActionType";
import { Action } from "../effects/store/useStore";
import { State } from "../types";

export const appReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ActionType.initApp:
      return { ...state, app: { ...state?.app, ...payload } };
    case ActionType.setModal:
      return { ...state, modal: { ...state?.modal, ...payload } } as any;
    case ActionType.getUser:
      return { ...state, user: { ...state?.user, ...payload } };
  }
};
