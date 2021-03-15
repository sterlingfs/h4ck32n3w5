import React, { Suspense, useEffect } from "react";
import "./App.css";

// import * as localForage from "localforage";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { routeTree } from "./routeTree";
import { useStore } from "./effects/store/useStore";
import { RouteName } from "./effects/use-router/RouteName";
import { State } from "./types";
import { matchPathname } from "./effects/use-router/matchPathname";
import { ActionType } from "./enums/ActionType";

const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  app: { init: false },
  user: undefined,
  modal: { position: "closed" },
};

function App() {
  // Router
  const pathname = window.location.pathname;
  const { route, setRoute } = useRouter(pathname, routeTree);

  // Store
  const { state, dispatch } = useStore<State, keyof typeof ActionType>({
    initState,
    actions: {
      didMount: async () => {},
      getUser: async () => {},
      initApp: async () => {},
      setModal: async () => {},
    },
    mutations: {
      didMount: () => {
        return {} as State;
      },
      getUser: () => {
        return {} as State;
      },
      initApp: () => {
        return {} as State;
      },
      setModal: () => {
        return {} as State;
      },
    },
  });

  // Load storage into memory
  useEffect(() => {
    // TODO Lift this to component did mount
    // localForage.iterate((value, key) =>
    //   dispatch({ type: key, payload: value })
    // );

    dispatch({ type: ActionType.didMount, payload: { module: "unknown" } });
  }, [dispatch]);

  // TODO Lift router outlet to a component
  const RouterOutlet = matchPathname(route?.name || RouteName.root);

  const store = { state, dispatch };
  return (
    <div className="App">
      <AppBar store={store} router={{ route, setRoute }} />

      {route && route.path}

      <Suspense fallback={<div>Loading...</div>}>
        <RouterOutlet store={store} router={{ route, setRoute }} />
        <Modal store={store} router={{ route, setRoute }} />
      </Suspense>

      <BottomNav setRoute={setRoute} />
    </div>
  );
}

export default App;
