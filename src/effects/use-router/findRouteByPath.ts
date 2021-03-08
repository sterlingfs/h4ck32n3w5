import { getRoute } from "./functions/getRoute";
import { RawRoute, Route, RouteConfig } from "./types";
import { matchSegments } from "./functions/matchSegments";

export function findRouteByPath(
  pathname: string,
  routeTree: RouteConfig[]
): Route | undefined {
  const rawRoute = routeTree.reduce(
    (match: RawRoute | undefined, routeConfig) => {
      return match ? match : matchSegments(pathname, routeConfig);
    },
    undefined
  );

  return rawRoute && getRoute(rawRoute);
}
