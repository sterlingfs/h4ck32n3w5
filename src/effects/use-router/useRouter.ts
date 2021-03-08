import { useReducer } from "react";
import { useEffect } from "react";
import { RouteConfig, NewRoute, Route } from "./types";
import { findRouteByPath } from "./findRouteByPath";
import { findRouteByName } from "./findRouteByName";

enum ActionType {
  pushPathname = "pushPathname",
  setRoute = "setRoute",
}

type State = {
  routeTree: RouteConfig[];
  route?: Route;
};

type Action = {
  type: ActionType;
  payload: any;
};

type MutationOptions = { state: State; payload: any };
type ActionOptions = { dispatch: React.Dispatch<Action>; state: State };

export function useRouter(initPathname: string, routeTree: RouteConfig[]) {
  const [state, dispatch] = useReducer(
    (state: State, { type, payload }: Action) =>
      mutations[type]({ state, payload }),
    { routeTree } as any
  );

  useEffect(() => {
    const pathname = initPathname;
    const route = findRouteByPath(pathname, state.routeTree);
    dispatch({ type: ActionType.pushPathname, payload: route });
  }, [initPathname, state.routeTree]);

  return {
    route: state.route,
    [ActionType.setRoute]: (newRoute: NewRoute) =>
      actions[ActionType.setRoute]({ dispatch, state }, newRoute),
  };
}

const actions = {
  [ActionType.pushPathname]: (
    { dispatch }: ActionOptions,
    payload: { initPathname: string }
  ) => {
    dispatch({
      type: ActionType.pushPathname,
      payload,
    });
  },
  [ActionType.setRoute]: (
    { dispatch, state }: ActionOptions,
    payload: NewRoute
  ) => {
    console.log(">>> Dispatch Route");
    const route = findRouteByName(payload, state.routeTree);

    route?.pathname &&
      window.history.pushState([], "history push title", route.pathname);

    dispatch({ type: ActionType.setRoute, payload: route });
  },
};

const mutations = {
  [ActionType.pushPathname]({ state, payload }: MutationOptions): State {
    return { ...state, route: payload };
  },

  [ActionType.setRoute]({ state, payload }: MutationOptions): State {
    return { ...state, route: payload };
  },
};
