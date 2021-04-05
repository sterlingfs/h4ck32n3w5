import React, { Suspense, useEffect, useReducer } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/database";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { routeTree } from "./routeTree";
import { RouteName } from "./effects/use-router/RouteName";
import { matchPathname } from "./effects/use-router/matchPathname";
import { ActionType } from "./enums/ActionType";

import { reducer } from "./reducer";

import { getItem, Snap } from "./firebase";
import { State } from "./state";
import { Action, HNComment, HNStory } from "./types";
import { useAppInit } from "./effects/useAppInit";
import { useWatchUid } from "./effects/useWatchUid";
import { stat } from "fs";
import { DBPath } from "./firebase/enums/DBPath";
import { useWatchList } from "./effects/useWatchList";

const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  mutationHistory: [],
  network: {},
  app: { init: false },
  mount: {},
  auth: { status: "unsubscribed" },
  modal: { position: "closed" },
  storyRecord: {},
  newStoryIds: [],
  newStoryList: [],
  topStoryIds: [],
  topStoryList: [],
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
    // console.log(">>> EMIT_ACTION", action.type, action.payload);
    const mutationHistory = [
      ...state.mutationHistory,
      { action, state: newState },
    ];
    return { ...newState, mutationHistory } as State;
  }, initState);

  useAppInit(dispatch);

  useWatchUid({ uid: state.auth.uid, status: state.auth.status }, dispatch);

  useWatchList(state.newStoryIds, dispatch);

  useWatchList(state.topStoryIds, dispatch);

  /**
   * ActionType watcher
   */
  useEffect(() => {
    // const [mutation] = state.mutationHistory;
    // if (mutation) {
    //   const { action } = mutation;
    //   const { type, payload } = action;
    //   switch (type) {
    //     default:
    //       return;
    //   }
    // }
  }, [state.mutationHistory]);

  /**
   * Fetch top commentnewStoryList
   */
  useEffect(() => {
    // console.log(">>> TOP_STORY_RECORD_CHANGE");
    // TODO #7 When topStoryRecord changes fetch the topCommnet if not in cache
  }, [state.storyRecord]);

  /**
   * Watch user's submitted items and emit replies
   */
  useEffect(() => {
    // FIXME Destory these listeners when the user changes accounts
    const submitted = state.auth.user?.submitted.slice(0, 50);
    if (submitted) {
      const db = firebase.database();
      submitted.forEach(async (id) => {
        if (state.submissionRecord[id] === undefined) {
          dispatch({
            type: ActionType.emitSubmission,
            payload: { [id]: {} },
          });

          db.ref(`/v0/item/${id}`).on("value", (submissionSnap) => {
            const submission: HNStory | HNComment = submissionSnap?.val();

            dispatch({
              type: ActionType.emitSubmission,
              payload: { [id]: submissionSnap.val() },
            });

            // FIXME Hold reply refs until needs to dealoc
            const replyRefs = submission.kids?.map((id) => {
              if (state.replyRecord[id] === undefined) {
                dispatch({
                  type: ActionType.emitReply,
                  payload: { [id]: {} },
                });
                return db.ref(`/v0/item/${id}`).on("value", (replySnap) => {
                  dispatch({
                    type: ActionType.emitReply,
                    payload: { [id]: replySnap.val() },
                  });
                });
              } else {
                return undefined;
              }
            });
          });
        }
      });
    }
  }, [state.auth.user?.submitted, state.submissionRecord, state.replyRecord]);

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
