import "./App.css";

import * as localforage from "localforage";
import React, { Suspense, useEffect } from "react";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";
import { matchPathname } from "./effects/use-router/matchPathname";
import { RouteName } from "./effects/use-router/RouteName";
import { useRouter } from "./effects/use-router/useRouter";
import { useStore } from "./effects/use-store/useStore";
import { useWatchUid } from "./effects/useWatchUid";
import { reducer } from "./reducer";
import { routeTree } from "./routeTree";
import { State } from "./state";
import { HNStory } from "./types";

const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  mutationHistory: [],
  network: {},
  app: { init: false },
  mount: {},
  auth: { status: "unsubscribed" },
  modal: { position: "closed" },
  newStoryIds: [],
  newStoryRecord: {},
  newStoryList: [],
  topStoryRecord: {},
  topStoryIds: [],
  topStoryList: [],
  submissionRecord: {},
  commentRecord: {},
};

function App() {
  const { route, setRoute } = useRouter(window.location.pathname, routeTree);
  const store = useStore(reducer, initState);

  // useAppInit(store.dispatch);
  // useWatchUid(store.state.auth.uid, store.dispatch);

  const database = {
    story: localforage.createInstance({ name: "story" }),
    newstories: localforage.createInstance({ name: "newstories" }),
    topstories: localforage.createInstance({ name: "topstories" }),
  };

  // useEffect(() => {
  //   const database = firebase.database();

  //   if (route?.name === RouteName.story) {
  //     const id = route.params?.storyId;

  //     database.ref(`/v0/item/${id}`).on("value", (storySnap) => {
  //       const { kids } = storySnap.val() as HNStory;

  //       Promise.all(
  //         kids.map((id) => database.ref(`/v0/item/${id}`).get())
  //       ).then((results) => {
  //         // console.log("results", results);
  //         // setComments(results.map((snap) => snap.val()));
  //       });

  //       // return () =>
  //       //   story?.kids
  //       //     .slice(0, 30)
  //       //     .forEach((id) => database.ref(`/v0/item/${id}`).off());
  //     });
  //   }
  // }, [route]);

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
