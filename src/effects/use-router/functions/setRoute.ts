import { ActionType, Route, Dispatch } from "../types";

export const setRoute = (route: Route, dispatch: Dispatch) => {
  if (route?.pathname) {
    window.history.pushState(JSON.stringify(route), "YCN", route.pathname);
    dispatch({ type: ActionType.setRoute, payload: route });
  }
};
