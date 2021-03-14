import { useReducer } from "react";
import { useEffect } from "react";
import { RouteConfig, NewRoute, Route } from "./types";
import { findRouteByPath } from "./findRouteByPath";
import { findRouteByName } from "./findRouteByName";

enum ActionType {
  pushState = "pushState",
  pushPathname = "pushPathname",
  setRoute = "setRoute",
  popState = "popState",
}

type State = {
  routeTree: RouteConfig[];
  route?: Route;
  history: Route[];
};

type Action = {
  type: ActionType;
  payload: any;
};

type MutationOptions = { state: State; payload: any };
// type ActionOptions = { dispatch: React.Dispatch<Action>; state: State };

export function useRouter(initPathname: string, routeTree: RouteConfig[]) {
  const [state, dispatch] = useReducer(
    (state: State, { type, payload }: Action) =>
      mutations[type]({ state, payload }),
    { routeTree, history: [] } as any
  );

  useEffect(() => {
    window.onpopstate = (event: PopStateEvent) => {
      console.log("should pop state");
    };
  }, []);

  useEffect(() => {
    const pathname = initPathname;
    const route = findRouteByPath(pathname, state.routeTree);
    dispatch({ type: ActionType.pushPathname, payload: route });
  }, [initPathname, state.routeTree]);

  useEffect(() => {
    state.route &&
      dispatch({ type: ActionType.pushState, payload: state.route });
  }, [state.route]);

  return {
    route: state.route,
    setRoute: (newRoute: NewRoute) => {
      const route = findRouteByName(newRoute, state.routeTree);
      dispatch({ type: ActionType.setRoute, payload: route });

      route?.pathname &&
        window.history.pushState([], "history push title", route.pathname);
    },

    // [ActionType.pushPathname]: (pathname: string) =>
    //   actions[ActionType.pushPathname]({ dispatch, state }, { pathname }),
  };
}

const mutations = {
  [ActionType.pushPathname]({ state, payload }: MutationOptions): State {
    return { ...state, route: payload };
  },

  [ActionType.setRoute]({ state, payload }: MutationOptions): State {
    return { ...state, route: payload };
  },

  [ActionType.pushState]({ state, payload }: MutationOptions): State {
    return { ...state, history: [...state.history, payload] };
  },

  [ActionType.popState]({ state, payload }: MutationOptions): State {
    return { ...state, history: [...state.history, payload] };
  },
};
