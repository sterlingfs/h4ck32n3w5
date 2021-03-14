import React, { Suspense, useEffect } from "react";
import "./App.css";

import * as localForage from "localforage";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { routeTree } from "./routeTree";
import { useStore, Action } from "./effects/store/useStore";
import { appReducer } from "./reducers/appReducer";
import { RouteName } from "./effects/use-router/RouteName";
import { State } from "./types";
import { matchPathname } from "./effects/use-router/matchPathname";

const Modal = React.lazy(() => import("./pages/modals/Modal"));

function App() {
  const initState: State = {
    app: { init: false },
    user: undefined,
    modal: { position: "closed" },
  };

  const { state, dispatch } = useStore<State>({
    initState,
    actions: {},
    mutations: {},
  });

  const pathname = window.location.pathname;
  const { route, setRoute } = useRouter(pathname, routeTree);

  useEffect(() => {
    localForage.iterate((value, key) =>
      dispatch({ type: key, payload: value } as Action)
    );
  }, [dispatch]);

  // TODO Lift router outlet to a component
  const RouterOutlet = matchPathname(route?.name || RouteName.root);

  console.log("render...");

  const store = { state, dispatch };
  return (
    <div className="App">
      <AppBar store={store} />

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
