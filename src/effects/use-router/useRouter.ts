import { RouteConfig, NewRoute, State } from "./types";
import { findRouteByName } from "./findRouteByName";
import { setRoute } from "./setRoute";
import { usePopStateListener } from "./effects/usePopStateListener";
import { useInit } from "./effects/useInit";
import { useStore } from "./effects/useStore";
import { usePushRoute } from "./effects/usePushRoute";
import { mutations } from "./mutations";

export function useRouter(pathname: string, routeTree: RouteConfig[]) {
  const initState: State = { routeTree, history: [] };
  const { state, dispatch } = useStore(mutations, initState);

  useInit(pathname, routeTree, dispatch);
  usePopStateListener(dispatch);
  usePushRoute(state.route, dispatch);

  return {
    route: state.route,
    setRoute: (newRoute: NewRoute) => {
      const route = findRouteByName(newRoute, state.routeTree);
      route && setRoute(route, dispatch);
    },
  };
}
