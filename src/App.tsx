import "./App.css";
import "firebase/database";

import * as localforage from "localforage";
import React, { Suspense, useEffect } from "react";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";
import { matchPathname } from "./effects/use-router/matchPathname";
import { RouteName } from "./effects/use-router/RouteName";
import { useRouter } from "./effects/use-router/useRouter";
import { useStore } from "./effects/use-store/useStore";
import { mutations } from "./mutations";
import { routeTree } from "./routeTree";
import { State, state as initState } from "./state";
import { ActionType } from "./enums/ActionType";

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
    // const database = firebase.database();

    if (route?.name === RouteName.story) {
      // const id = route.params?.storyId;
      // database.ref(`/v0/item/${id}`).on("value", (storySnap) => {
      //   const { kids } = storySnap.val() as HNStory;
      //   Promise.all(
      //     kids.map((id) => database.ref(`/v0/item/${id}`).get())
      //   ).then((kidSnaps) => {
      //     dispatch({
      //       type: ActionType.setSelectedStory,
      //       payload: {
      //         story: storySnap.val(),
      //         comments: kidSnaps.map((c) => c.val()),
      //       },
      //     });
      //   });
      //   return () => {
      //     storySnap.ref.off();
      //     kids.forEach((id) => database.ref(`/v0/item/${id}`).off());
      //   };
      // });
    } else if (route?.name === RouteName.topStories) {
      /**
       * NEW CASE
       */
      // set forage on each state change
      // set state from forage on app init
      // const topStoriesRef = database.ref(`/v0/${TOP_STORIES}`);
      // topStoriesRef.on("value", (snap) => {
      //   dispatch({ type: ActionType.emitTopStoryIds, payload: snap.val() });
      // });
      // return () => topStoriesRef?.off();
    }
  }, [dispatch, route]);

  // TODO #4 Lift router outlet to a component
  const RouterOutlet = matchPathname(route?.name || RouteName.root);

  return (
    <div className="App">
      <AppBar store={store} database={database} router={{ route, setRoute }} />

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
