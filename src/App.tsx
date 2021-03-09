import React, { Suspense, useEffect, useReducer } from "react";
import "./App.css";

import * as localForage from "localforage";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { Action, RouteName, State } from "./types";

type LazyComp = typeof Stories | typeof Replies;

const Stories = React.lazy(() => import("./pages/Stories"));
const Replies = React.lazy(() => import("./pages/Replies"));
const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  app: { init: true },
  user: undefined,
  modal: { position: "closed" },
};

function App() {
  const [state, dispatch] = useReducer(
    (a: State, { type, payload }: Action) => {
      localForage.setItem(type, payload);
      return { ...a, [type]: payload } as State;
    },
    initState
  );

  const pathname = window.location.pathname;
  const { route, setRoute } = useRouter(pathname, [
    {
      name: RouteName.root,
      path: "/",
    },
    {
      name: RouteName.stories,
      path: "/stories",
    },
    {
      name: RouteName.replies,
      path: "/replies",
    },
  ]);

  useEffect(() => {
    localForage.iterate((value, key) =>
      dispatch({ type: key, payload: value } as Action)
    );
  }, []);

  const matchPathname = (routeName: RouteName): LazyComp => {
    switch (routeName) {
      case RouteName.root:
        return Stories;
      case RouteName.stories:
        return Stories;
      case RouteName.replies:
        return Replies;
    }
  };

  const RouterOutlet = matchPathname(route?.name || RouteName.root);

  console.log("render...");

  const store = { state, dispatch };
  return (
    <div className="App">
      <AppBar store={store} />

      {route && route.path}

      <Suspense fallback={<div>Loading...</div>}>
        <RouterOutlet store={store} />
        <Modal store={store} />
      </Suspense>

      <BottomNav setRoute={setRoute} />
    </div>
  );
}

export default App;
