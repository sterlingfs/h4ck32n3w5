import { RawRoute, RouteConfig } from "../types";
import { getSegments } from "./getSegments";

export function matchSegments(
  pathname: string,
  routeConfig: RouteConfig
): RawRoute | undefined {
  const segments = getSegments(pathname, routeConfig.path);
  return (
    segments && {
      ...routeConfig,
      pathname,
      segments,
    }
  );
}
