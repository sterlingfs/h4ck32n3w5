import React, { Suspense, useEffect, useReducer } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/database";

import * as localForage from "localforage";

import AppBar from "./components/app-bar/AppBar";
import BottomNav from "./components/bottom-nav/BottomNav";

import { useRouter } from "./effects/use-router/useRouter";
import { routeTree } from "./routeTree";
import { RouteName } from "./effects/use-router/RouteName";
import { matchPathname } from "./effects/use-router/matchPathname";
import { ActionType } from "./enums/ActionType";

import { reducer } from "./reducer";

import { Snap } from "./firebase";
import { State } from "./state";
import { Action, HNComment, HNStory } from "./types";

const Modal = React.lazy(() => import("./pages/modals/Modal"));

const initState: State = {
  mutationHistory: [],
  network: {},
  app: { init: false },
  mount: {},
  auth: {},
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
    console.log(">>> EMIT_ACTION", action.type, action.payload);
    const mutationHistory = [
      ...state.mutationHistory,
      { action, state: newState },
    ];
    return { ...newState, mutationHistory } as State;
  }, initState);

  useEffect(() => {
    localForage
      .iterate((value, key) => {
        dispatch({ type: ActionType.setState, payload: { [key]: value } });
      })
      .then(() => {
        const db = firebase.database();

        /**
         * Watch topStories and emit id list
         */
        const topStoriesRef = db.ref("/v0/topstories");
        topStoriesRef.on("value", (snap) =>
          dispatch({ type: ActionType.emitTopStoryIds, payload: snap.val() })
        );

        /**
         * Watch new story ids and emit id list
         */
        const newStoriesRef = db.ref("/v0/newstories");
        newStoriesRef.on("value", (snap) =>
          dispatch({ type: ActionType.emitNewStoryIds, payload: snap.val() })
        );

        return () => {
          newStoriesRef.off();
          topStoriesRef.off();
        };
      });
  }, []);

  /**
   * Watch user
   */
  useEffect(() => {
    const auth = state.auth ?? {};
    auth && localForage.setItem("auth", auth);

    if (auth.uid) {
      const db = firebase.database();
      const ref = db.ref(`/v0/user/${auth.uid}`);
      ref.on("value", (snap) =>
        dispatch({ type: ActionType.emitUser, payload: snap.val() })
      );
      return ref.off;
    }
  }, [state.auth]);

  /**
   * Cache to storage
   */
  useEffect(() => {}, [state.auth]);

  useEffect(() => {
    localForage.setItem("modal", state.modal);
  }, [state.modal]);

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
   * How cache these items to avoid repeated on/off
   * Put the ref in the store
   *
   * Combined cache
   * Build list by sorting list ids and reference record id
   */

  /**
   * Emit story for each top story id
   */
  // TODO Combine the effects of newStoryIds and topStoryIds
  useEffect(() => {
    const db = firebase.database();

    state.newStoryIds.slice(0, 10).forEach((id, i) => {
      if (state.storyRecord[id] === undefined) {
        dispatch({
          type: ActionType.emitNewStory,
          payload: { [id]: {} },
        });

        const ref = db.ref(`/v0/item/${id}`);
        ref.on("value", (snap: Snap) => {
          // console.log(">>> EMIT_NEW_STORY", i);
          dispatch({
            type: ActionType.emitNewStory,
            payload: { [id]: snap.val() },
          });
        });
      }
    });
  }, [state.newStoryIds, state.storyRecord]);

  useEffect(() => {
    const db = firebase.database();

    const refs = state.topStoryIds.slice(0, 10).map((id, i) => {
      const ref = db.ref(`/v0/item/${id}`);

      ref.on("value", (snap: Snap) => {
        // console.log(">>> EMIT_TOP_STORY", i);
        // dispatch({
        //   type: ActionType.emitTopStory,
        //   payload: { [snap.key!]: snap.val() },
        // });
      });
      return ref;
    });
    return () => refs.forEach((ref) => ref?.off());
  }, [state.topStoryIds]);

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
