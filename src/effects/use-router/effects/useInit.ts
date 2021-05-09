import { useEffect } from "react";
import { findRouteByPath } from "../findRouteByPath";
import { ActionType, Dispatch, RouteConfig } from "../types";

export function useInit(
  path: string,
  routeTree: RouteConfig[],
  dispatch: Dispatch
) {
  useEffect(() => {
    const route = findRouteByPath(path, routeTree);
    route && dispatch({ type: ActionType.pushPathname, payload: route });
  }, [path, routeTree, dispatch]);
}
