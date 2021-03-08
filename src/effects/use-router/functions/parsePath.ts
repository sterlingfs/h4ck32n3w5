import { NewRoute, RouteConfig } from "../types";

export function parsePath(
  newRoute: NewRoute,
  routeConfig: RouteConfig
): string | undefined {
  const splitRouteConfig = routeConfig.path.split("/");
  return splitRouteConfig
    .map((stub) => {
      const isParam = stub.slice(0, 1) === ":";
      const params = newRoute.params;
      const paramValue = isParam && params ? params[stub.slice(1)] : undefined;
      return paramValue ?? stub;
    })
    .join("/");
}
