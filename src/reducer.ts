import { State, Action, ActionType } from "./types";

export function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ActionType.initApp:
      return { ...state, app: payload };
    case ActionType.setModal:
      return { ...state, modal: payload };
    case ActionType.getUser:
      return { ...state, user: payload };
  }
}
