import React, { Suspense, useEffect } from "react";
import "./App.css";

import * as localForage from "localforage";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { routeTree } from "./routeTree";
import { useStore } from "./effects/store/useStore";
import { RouteName } from "./effects/use-router/RouteName";
import { State, User } from "./types";
import { matchPathname } from "./effects/use-router/matchPathname";
import { ActionType } from "./enums/ActionType";

const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  app: { init: false },
  // mount: {},
  user: undefined,
  modal: { position: "closed" },
  itemRecord: {},
};

function App() {
  // Router
  const pathname = window.location.pathname;
  const { route, setRoute } = useRouter(pathname, routeTree);

  // Store
  const { state, dispatch } = useStore<State, keyof typeof ActionType>({
    initState,
    initializer: (state) => state,
    actions: {
      initApp: async ({ commit, dispatch }) => {
        localForage
          .iterate((value, key) => {
            dispatch({ type: ActionType.setState, payload: { [key]: value } });
          })
          .finally(() => {
            commit({ type: ActionType.initApp, payload: { init: true } });
          });
      },
      setState: async ({ commit }, payload) => {
        commit({ type: ActionType.setState, payload });
      },
      // didMount: async ({ commit }, payload: { init: boolean }) => {
      //   commit({ type: ActionType.didMount, payload });
      // },
      getUser: async ({ commit }, payload: { id: string }) => {
        commit({ type: ActionType.getUser, payload });
      },
      setModal: async ({ commit }, payload: Pick<State, "modal">) => {
        commit({ type: ActionType.setModal, payload });
      },
    },
    mutations: {
      initApp: (state, payload: State["app"]) => {
        localForage.setItem("app", payload);
        return { ...state, ...payload };
      },
      setState: (state, payload: Partial<State>) => {
        return { ...state, ...payload };
      },
      // didMount: (state, payload: State["mount"]) => {
      //   localForage.setItem("mount", payload);
      //   return { ...state, didMount: payload };
      // },
      getUser: (state, payload: User) => {
        localForage.setItem("user", payload);
        return { ...state, user: payload };
      },
      setModal: (state, payload: State["modal"]) => {
        localForage.setItem("modal", payload);
        return { ...state, modal: payload };
      },
    },
  });

  useEffect(() => {
    dispatch({ type: ActionType.initApp });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
