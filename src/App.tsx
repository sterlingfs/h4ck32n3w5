import React, { Suspense, useEffect, useReducer } from "react";
import "./App.css";

import * as localForage from "localforage";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { routeTree } from "./routeTree";
import { RouteName } from "./effects/use-router/RouteName";
import { matchPathname } from "./effects/use-router/matchPathname";
import { ActionType } from "./enums/ActionType";
import { Action } from "./effects/store/types";
import { reducer } from "./reducer";

import firebase from "firebase/app";
import "firebase/database";
import { Snap } from "./firebase";
import { State } from "./state";
import { HNComment, HNStory } from "./types";

const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  actionHistory: [],
  app: { init: false },
  mount: {},
  user: undefined,
  modal: { position: "closed" },
  topStoryRecord: {},
  topStoryIds: [],
  topStoryOrderedList: [],
  submissionRecord: {},
  replyRecord: {},
};

type Keys = keyof typeof ActionType;

function App() {
  // Router
  const pathname = window.location.pathname;
  const { route, setRoute } = useRouter(pathname, routeTree);

  // Store
  const [state, dispatch] = useReducer((state: State, action: Action<Keys>) => {
    const newState = reducer(state, action);
    console.log(">>> EMIT_ACTION", action.type, action.payload);
    const actionHistory = [...state.actionHistory, { action, state: newState }];
    return { ...newState, actionHistory } as State;
  }, initState);

  useEffect(() => {
    console.log(">>> INIT");

    localForage.iterate((value, key) => {
      dispatch({ type: ActionType.setState, payload: { [key]: value } });
    });

    const db = firebase.database();
    const ref = db.ref("/v0/topstories");
    ref.on("value", (snap) =>
      dispatch({ type: ActionType.emitTopStoryIds, payload: snap.val() })
    );
    return ref.off;
  }, []);

  useEffect(() => {
    state.user && localForage.setItem("user", state.user);
  }, [state.user]);

  useEffect(() => {
    localForage.setItem("modal", state.modal);
  }, [state.modal]);

  useEffect(() => {
    // FIXME #1 Add deps and protect agains loop by only updating state if no watcher
    const db = firebase.database();
    // TODO #2 Indicate start of fetch

    // TODO #8 Diff the changes from emitTopStory to determine if children are tracking
    state.topStoryIds.forEach((id) => {
      if (state.topStoryRecord[id] === undefined) {
        const ref = db.ref(`/v0/item/${id}`);
        ref.on("value", (snap: Snap) =>
          dispatch({
            type: ActionType.emitTopStory,
            payload: { [snap.key!]: snap.val() },
          })
        );
      }
    });
    // TODO #2 Indicate end of fetch
  }, [state.topStoryIds, state.topStoryRecord]);

  // useEffect(() => {
  //   // FIXME #1 Add deps and protect agains loop by only updating state if no watcher
  //   const db = firebase.database();
  //   // TODO #2 Indicate start of fetch
  //   const refs = state.topStoryIds.map((id) => {
  //     const ref = db.ref(`/v0/item/${id}`);
  //     ref.on("value", (snap: Snap) =>
  //       dispatch({
  //         type: ActionType.emitTopStory,
  //         payload: { [snap.key!]: snap.val() },
  //       })
  //     );
  //     return ref;
  //   });
  //   // TODO #2 Indicate end of fetch

  //   return () => refs.forEach((ref) => ref?.off());
  // }, [state.topStoryIds]);

  useEffect(() => {
    console.log(">>> TOP_STORY_RECORD_CHANGE");
    // TODO #7 When topStoryRecord changes fetch the topCommnet if not in cache
  }, [state.topStoryRecord]);

  useEffect(() => {
    const submitted = state.user?.submitted.slice(0, 30);

    const newItems = submitted?.filter((itemId) => {
      return state.submissionRecord[itemId] ? false : true;
    });

    if (newItems) {
      const db = firebase.database();
      newItems.forEach(async (id) => {
        // Fetch the submitted item
        const ref = db.ref(`/v0/item/${id}`);
        const item = (await ref.get().then((snap) => snap.val())) as
          | HNStory
          | HNComment;

        dispatch({ type: ActionType.emitSubmission, payload: { [id]: item } });

        // TODO #3 Indicate beginning and end of fetch
        // Fetch the item's comments
        item.kids?.forEach((id) => {
          const ref = db.ref(`/v0/item/${id}`);
          ref.get().then((snap) => {
            dispatch({
              type: ActionType.emitReply,
              payload: { [id]: snap.val() },
            });
          });
        });
      });
    }
  }, [state.user?.submitted, state.submissionRecord]);

  // TODO #4 Lift router outlet to a component
  const RouterOutlet = matchPathname(route?.name || RouteName.root);

  const store = { state, dispatch };
  return (
    <div className="App">
      <AppBar store={store} router={{ route, setRoute }} />

      <Suspense fallback={<div>Loading...</div>}>
        <RouterOutlet store={store} router={{ route, setRoute }} />
        <Modal store={store} router={{ route, setRoute }} />
      </Suspense>

      <BottomNav setRoute={setRoute} />
    </div>
  );
}

export default App;
