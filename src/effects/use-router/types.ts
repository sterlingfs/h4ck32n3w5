/**
 * Raw route pathname may contain /segment/:vars
 */

export type ParamMap = { [param: string]: string };

export type Segment = {
  type: "variable" | "static";
  key: string;
  value: string | null;
};

export type RouteConfig = {
  name: string;
  path: string;
  redirect?: boolean;
  hooks?: {
    before?: () => void;
    after?: () => void;
  };
};

export type NewRoute = {
  name: string;
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
