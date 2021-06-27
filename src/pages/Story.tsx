import "firebase/database";

import firebase from "firebase/app";
import React, { useEffect, useReducer } from "react";

import CommentItem from "../components/comment-item/CommentItem";
import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { ActionType } from "../enums/ActionType";
import { NetworkStatus } from "../enums/NetworkStatus";
import { recursiveFetch } from "../functions/recursiveFetch";
import { Payload } from "../mutations";
import { CommentFilterRecord as CFR, HNStory } from "../types";
import { InjectedComponentBaseProps } from "./types";
import { Database, getComment } from "../functions/getComment";

// import localforage from "localforage";

// database.ref(`/v0/item/${storyId}`).on("value", (storySnap) => {
//   const { kids } = storySnap.val() as HNStory;
//   // TODO lift function
//   const getRequest = (id: number) => database.ref(`/v0/item/${id}`).get();
//   const requests = kids.map(getRequest);

//   Promise.all(requests).then((kidSnaps) => {
//     const payload: P = {
//       status: NetworkStatus.resolved,
//       story: storySnap.val(),
//       comments: kidSnaps.map((c) => c.val()),
//     };

//     dispatch({ type: ActionType.setStory, payload });
//   });

//   // Recurse =>

//   return () => {
//     storySnap.ref.off();
//     kids.forEach((id) => database.ref(`/v0/item/${id}`).off());
//   };
// });

export type StoryProps = InjectedComponentBaseProps;
type P = Payload<ActionType.setStory>;

const database = firebase.database();

const getToggleCollapseCallback =
  (emitFilter: React.Dispatch<CFR>, filterRecord: CFR) =>
  (commentId: number) => {
    emitFilter({
      [commentId]: {
        collapsed: filterRecord[commentId]?.collapsed ? false : true,
      },
    });
  };

// type CE = StoryProps["store"]["state"]["storyPage"]["comments"];
// type GetFilterTree = (record: CFR, commentEntries: CE) => CFR;
// const getFilterTree: GetFilterTree = (filterRecord, commentEntries) => {
//   return commentEntries
//     .map(([comment, childEntries]) => {
//       const collapsed = comment.dead ?? false;
//       const newEntry: CFR = { [comment.id]: { collapsed } };
//       const newRecord: CFR = { ...filterRecord, ...newEntry };
//       return childEntries.length > 0
//         ? getFilterTree(newRecord, childEntries)
//         : newRecord;
//     })
//     .reduce((a, c) => ({ ...a, ...c }), {});
// };

/**
 * How to limit the fetch
 * depth && per comment
 */

export default function Story(props: StoryProps) {
  const { story, comments } = props.store.state.storyPage;
  const storyId = props.router.route?.params?.storyId;
  const dispatch = props.store.dispatch;

  const rank = story?.id
    ? props.store.state.app.topStoryIds.indexOf(story.id) + 1
    : null;

  const [filterRecord, emitFilterRecord] = useReducer(
    (record: CFR, current: CFR) => ({
      ...record,
      ...current,
    }),
    {}
  );

  // FIXME use the variable for the depth to also set the init filter record

  // useEffect(() => {
  //   emitFilterRecord(getFilterTree({}, comments));
  // }, [comments]);

  const expanded = props.store.state.storyPage.expanded;
  useEffect(() => {
    const dispatchStory = (payload: P) => {
      dispatch({ type: ActionType.setStory, payload });
    };

    dispatchStory({
      status: NetworkStatus.awaiting,
      story: null,
      comments: [],
    });

    const ref = database.ref(`/v0/item/${storyId}`);
    const fetchNodeTree = async (commentId: number) =>
      await recursiveFetch([], commentId, 0, database, {
        depthLimit: 1,
        expanded: {},
      });

    ref.on("value", async (storySnap) => {
      const story = storySnap.val() as HNStory;

      if (true) {
        const proms = story.kids.map(fetchNodeTree);
        const comments = await Promise.all(proms).then((p) => p.flat());
        dispatchStory({
          status: NetworkStatus.resolved,
          story,
          comments,
        });
      } else {
        // const getCommentWithDatabase = (d: Database) => (id: number) =>
        //   getComment(id, d);
        // const proms = story.kids.map(getCommentWithDatabase(database));
        // Promise.all(proms).then((comments) => {
        //   console.log(
        //     "ffff",
        //     comments.map((snap) => snap.val())
        //   );
        //   dispatchStory({
        //     comments: comments.map((snap) => [snap.val(), []]),
        //     status: NetworkStatus.resolved,
        //     story,
        //   });
        // });
      }
    });

    return () => ref.off();
  }, [storyId, expanded, dispatch]);

  const getFilterGetter = (filterRecord: CFR) => (commentId: number) =>
    filterRecord[commentId];

  return (
    <div className={Layout.container}>
      {story && (
        <StoryItem rank={rank} story={story} shouldPushComments={() => {}} />
      )}
      <div>
        {comments &&
          comments.map(([comment, kids], i) => {
            return (
              <CommentItem
                key={i}
                comment={comment}
                kids={kids}
                getFilter={getFilterGetter(filterRecord)}
                toggleCollapse={getToggleCollapseCallback(
                  emitFilterRecord,
                  filterRecord
                )}
              />
            );
          })}
      </div>
    </div>
  );
}
