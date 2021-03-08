import { parsePath } from "./functions/parsePath";
import { getRoute } from "./functions/getRoute";
import { matchSegments } from "./functions/matchSegments";
import { NewRoute, Route, RouteConfig } from "./types";

export function findRouteByName(
  newRoute: NewRoute,
  tree: RouteConfig[]
): Route | undefined {
  const routeConfig = tree.find(({ name }) => name === newRoute.name);

  if (routeConfig) {
    const path = parsePath(newRoute, routeConfig);
    if (path) {
      const rawRoute = matchSegments(path, routeConfig);
      if (rawRoute) {
        return getRoute(rawRoute);
      }
    }
  }

  return undefined;
}
