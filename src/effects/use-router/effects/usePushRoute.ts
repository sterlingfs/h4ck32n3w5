import { useEffect } from "react";
import { ActionType, Dispatch, Route } from "../types";

export function usePushRoute(route: Route | undefined, dispatch: Dispatch) {
  useEffect(() => {
    route && dispatch({ type: ActionType.pushState, payload: route });
  }, [route, dispatch]);
}
