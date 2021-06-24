import "./App.css";
import "firebase/database";

import * as localforage from "localforage";
import React, { Suspense, useEffect } from "react";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";
import { matchPathname } from "./effects/use-router/matchPathname";
import { RouteName } from "./effects/use-router/types";
import { useRouter } from "./effects/use-router/useRouter";
import { useStore } from "./effects/use-store/useStore";
import { ActionType } from "./enums/ActionType";
import { mutations, Payload } from "./mutations";
import { routeTree } from "./routeTree";
import { State, state as initState } from "./state";
import firebase from "firebase";
import { DBPath } from "./enums/DBPath";

const Modal = React.lazy(() => import("./pages/Modal"));

function App() {
  const { route, setRoute } = useRouter(window.location.pathname, routeTree);

  const store = useStore<ActionType, State>({
    initState,
    mutations,
  });

  // useWatchUid(store.state.auth.uid, store.dispatch);

  const database = {
    story: localforage.createInstance({ name: "story" }),
    newstories: localforage.createInstance({ name: "newstories" }),
    topstories: localforage.createInstance({ name: "topstories" }),
  };

  const dispatch = store.dispatch;

  useEffect(() => {
    const database = firebase.database();
    const topStoriesRef = database.ref(`/v0/${DBPath.topStories}`);
    topStoriesRef.on("value", (snap) => {
      const payload: Payload<ActionType.setTopStoryIds> = snap.val();
      dispatch({ type: ActionType.setTopStoryIds, payload });
    });
  }, [dispatch]);

  // TODO #4 Lift router outlet to a component
  const RouterOutlet = matchPathname(route?.name || RouteName.root);

  return (
    <div className="App">
      {/* <AppBar store={store} database={database} router={{ route, setRoute }} /> */}

      <Suspense fallback={<div>Loading...</div>}>
        <RouterOutlet
          store={store}
          database={database}
          router={{ route, setRoute }}
        />
        <Modal store={store} database={database} router={{ route, setRoute }} />
      </Suspense>

      <BottomNav setRoute={setRoute} />
    </div>
  );
}

export default App;
