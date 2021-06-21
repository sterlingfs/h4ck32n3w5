import { parsePath } from "./parsePath";
import { getRoute } from "./getRoute";
import { matchSegments } from "./matchSegments";
import { NewRoute, Route, RouteConfig, RouteName } from "../types";

export function findRouteByName(
  newRoute: NewRoute,
  tree: RouteConfig[]
): Route | undefined {
  const getRouteConfig = (
    routeName: RouteName,
    tree: RouteConfig[]
  ): RouteConfig => {
    const config = tree.find(({ name }) => name === routeName);
    if (config) {
      return config.redirect ? getRouteConfig(config.redirect, tree) : config;
    } else {
      throw new Error("RouteConfig not found");
    }
  };

  const routeConfig = getRouteConfig(newRoute.name, tree);

  if (routeConfig) {
    const path = parsePath(newRoute, routeConfig);
    if (path) {
      const rawRoute = matchSegments(path, routeConfig);
      if (rawRoute) {
        return getRoute(rawRoute);
      }
    }
  }

  throw new Error("Route not found");
}
