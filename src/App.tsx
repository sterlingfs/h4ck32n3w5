import React, { Suspense, useEffect, useReducer } from "react";
import "./App.css";

import * as localForage from "localforage";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { Action, RouteName, State } from "./types";
import { reducer } from "./reducer";
import { routeTree } from "./routeTree";

type LazyComp = typeof Stories | typeof Replies;

const Stories = React.lazy(() => import("./pages/Stories"));
const Replies = React.lazy(() => import("./pages/Replies"));
const Comments = React.lazy(() => import("./pages/Comments"));

const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  app: { init: false },
  user: undefined,
  modal: { position: "closed" },
};

function App() {
  const [state, dispatch] = useReducer(
    (state: State, { type, payload }: Action) => {
      console.log(">>> Dispatch", type, payload);

      localForage.setItem(type, payload);
      return reducer(state, { type, payload });
    },
    initState
  );

  const pathname = window.location.pathname;
  const { route, setRoute } = useRouter(pathname, routeTree);

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
      case RouteName.comments:
        return Comments;
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
        <RouterOutlet store={store} router={{ route, setRoute }} />
        <Modal store={store} router={{ route, setRoute }} />
      </Suspense>

      <BottomNav setRoute={setRoute} />
    </div>
  );
}

export default App;
