export type Dispatch = React.Dispatch<Action>;
export type MutationOptions = { state: State; payload: any };

export enum RouteName {
  root = "root",
  topStories = "top-stories",
  lastest = "lastest",
  replies = "replies",
  story = "s",
}

export enum ActionType {
  pushState = "pushState",
  pushPathname = "pushPathname",
  setRoute = "setRoute",
  popState = "popState",
}

export type State = {
  routeTree: RouteConfig[];
  route?: Route;
  history: Route[];
};

export type Action = {
  type: ActionType;
  payload?: any;
};

export type Router = { route?: Route; setRoute: (newRoute: NewRoute) => void };

export type ParamMap = Record<string, string | number>;

export type Segment = {
  type: "variable" | "static";
  key: string;
  value: string | null;
};

export type RouteConfig = {
  name: RouteName;
  path: string;
  redirect?: RouteName | null;
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
