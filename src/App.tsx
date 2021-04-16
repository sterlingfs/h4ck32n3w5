import React, { Suspense, useEffect, useReducer } from "react";
import "./App.css";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { routeTree } from "./routeTree";
import { RouteName } from "./effects/use-router/RouteName";
import { matchPathname } from "./effects/use-router/matchPathname";
import { ActionType } from "./enums/ActionType";

import { reducer } from "./reducer";

import { State } from "./state";
import { Action } from "./types";
import { useAppInit } from "./effects/useAppInit";
import { useWatchUid } from "./effects/useWatchUid";

const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  mutationHistory: [],
  network: {},
  app: { init: false },
  mount: {},
  auth: { status: "unsubscribed" },
  modal: { position: "closed" },

  newStoryRecord: {},
  topStoryRecord: {},

  newStoryIds: [],
  newStoryList: [],
  topStoryIds: [],
  topStoryList: [],
  submissionRecord: {},
  commentRecord: {},
};

type Keys = keyof typeof ActionType;

function App() {
  // Router
  const pathname = window.location.pathname;
  const { route, setRoute } = useRouter(pathname, routeTree);

  // Store
  const [state, dispatch] = useReducer((state: State, action: Action<Keys>) => {
    const newState = reducer(state, action);
    const mutationHistory = [
      ...state.mutationHistory.slice(0, 50),
      { action, state: newState },
    ];
    return { ...newState, mutationHistory } as State;
  }, initState);

  useAppInit(dispatch);

  useWatchUid(state.auth.uid, dispatch);

  // useWatchTopStories(state.topStoryIds, dispatch);

  /**
   * Fetch top commentnewStoryList
   */
  useEffect(() => {
    // console.log(">>> TOP_STORY_RECORD_CHANGE");
    // TODO #7 When topStoryRecord changes fetch the topCommnet if not in cache
    //
  }, []);

  /**
   * Watch user's submitted items and emit replies
   */
  // useEffect(() => {

  //   NEXT

  //   // FIXME Destory these listeners when the user changes accounts
  //   const submitted = state.auth.user?.submitted.slice(0, 50);
  //   if (submitted) {
  //     const db = firebase.database();
  //     submitted.forEach(async (id) => {
  //       if (state.submissionRecord[id] === undefined) {
  //         dispatch({
  //           type: ActionType.emitSubmission,
  //           payload: { [id]: {} },
  //         });

  //         db.ref(`/v0/item/${id}`).on("value", (submissionSnap) => {
  //           const submission: HNStory | HNComment = submissionSnap?.val();

  //           dispatch({
  //             type: ActionType.emitSubmission,
  //             payload: { [id]: submissionSnap.val() },
  //           });

  //           // FIXME Hold reply refs until needs to dealoc
  //           const replyRefs = submission.kids?.map((id) => {
  //             if (state.replyRecord[id] === undefined) {
  //               dispatch({
  //                 type: ActionType.emitReply,
  //                 payload: { [id]: {} },
  //               });
  //               return db.ref(`/v0/item/${id}`).on("value", (replySnap) => {
  //                 dispatch({
  //                   type: ActionType.emitReply,
  //                   payload: { [id]: replySnap.val() },
  //                 });
  //               });
  //             } else {
  //               return undefined;
  //             }
  //           });
  //         });
  //       }
  //     });
  //   }
  // }, [state.auth.user?.submitted, state.submissionRecord, state.replyRecord]);

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
