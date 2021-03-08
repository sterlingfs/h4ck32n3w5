import React, { Suspense, useEffect, useReducer } from "react";
import "./App.css";

import * as localForage from "localforage";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { Action, State } from "./types";

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
      name: "page1",
      path: "/page-one",
    },
    {
      name: "root",
      path: "/",
    },
    {
      name: "page3",
      path: "/page-two/:pageId/sub-page/:uid/:token",
    },
    {
      name: "page2",
      path: "/page-two/:pageId",
    },
  ]);

  useEffect(() => {
    localForage.iterate((value, key) =>
      dispatch({ type: key, payload: value } as Action)
    );
  }, []);

  const matchPathname = (pathname: string): LazyComp => {
    switch (pathname) {
      case "/":
        return Stories;
      case "/stories":
        return Stories;
      case "/replies":
        return Replies;
      default: {
        return matchPathname("/");
      }
    }
  };

  const RouterOutlet = matchPathname(window.location.pathname);

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
