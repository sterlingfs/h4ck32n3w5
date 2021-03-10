/**
 * Raw route pathname may contain /segment/:vars
 */

import { RouteName } from "../../types";

export type ParamMap = Record<string, string | number>;

export type Segment = {
  type: "variable" | "static";
  key: string;
  value: string | null;
};

export type RouteConfig = {
  name: RouteName;
  path: string;
  redirect?: boolean;
  hooks?: {
    before?: () => void;
    after?: () => void;
  };
};

export type NewRoute = {
  name: RouteName;
  params?: ParamMap;
};

export type Segments = {
  pathname: string;
  segments: Segment[];
};

type BaseRoute = NewRoute & Segments;

export type RawRoute = BaseRoute & RouteConfig;

export type Route = BaseRoute & Required<RouteConfig>;

export type RouteMatch = { match: boolean; routeConfig: RouteConfig | null };
