import "firebase/database";

import firebase from "firebase/app";
import { useEffect, useReducer } from "react";

import CommentItem from "../components/comment-item/CommentItem";
import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { ActionType } from "../enums/ActionType";
import { InjectedComponentBaseProps } from "./types";
import { CommentEntry, FilterRecord, HNComment, HNStory } from "../types";
import { NetworkStatus } from "../enums/NetworkStatus";
import { Payload } from "../mutations";

export type StoryProps = InjectedComponentBaseProps;
type P = Payload<ActionType.setStory>;

const database = firebase.database();

export default function Story(props: StoryProps) {
  const { story, comments } = props.store.state.storyPage;
  const storyId = props.router.route?.params?.storyId;
  const dispatch = props.store.dispatch;

  const rank = story?.id
    ? props.store.state.app.topStoryIds.indexOf(story.id) + 1
    : null;

  const [filterRecord, emitFilter] = useReducer(
    (record: FilterRecord, current: FilterRecord) => ({
      ...record,
      ...current,
    }),
    {}
  );

  useEffect(() => {
    const payload: P = {
      status: NetworkStatus.awaiting,
      story: null,
      comments: [],
    };
    dispatch({ type: ActionType.setStory, payload });

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

    database.ref(`/v0/item/${storyId}`).on("value", async (storySnap) => {
      const story = storySnap.val() as HNStory;
      const { kids } = story;

      // TODO lift function
      const getRequest = (id: number) => database.ref(`/v0/item/${id}`).get();

      const recursiveFetch = (
        entries: CommentEntry[],
        commentId: number,
        depth: number
      ): Promise<CommentEntry[]> => {
        return new Promise((resolve) => {
          getRequest(commentId).then((snap) => {
            const comment: HNComment = { ...snap.val(), depth };
            const kids = comment.kids || [];

            const reqs = kids.map((id) =>
              recursiveFetch(entries, id, depth + 1)
            );

            Promise.all(reqs)
              .then((kids) => kids.flat())
              .then((kids) => [...entries, [comment, kids]] as CommentEntry[])
              .then(resolve);
          });
        });
      };

      const proms = kids.map(
        async (commentId) => await recursiveFetch([], commentId, 0)
      );

      const comments = await Promise.all(proms).then((p) => p.flat());

      const payload: P = {
        status: NetworkStatus.resolved,
        story,
        comments,
      };

      dispatch({ type: ActionType.setStory, payload });

      return () => {
        storySnap.ref.off();
      };
    });
  }, [storyId, dispatch]);

  return (
    <div className={Layout.container}>
      {story && (
        <StoryItem rank={rank} story={story} shouldPushComments={() => {}} />
      )}
      <div style={{ padding: "16px" }}>
        {comments &&
          comments.map(([comment, kids], i) => {
            return (
              <CommentItem
                key={i}
                comment={comment}
                kids={kids}
                filter={filterRecord[comment.id]}
                shouldShowDead={() => {
                  emitFilter({ [comment.id]: { showDead: true } });
                }}
              />
            );
          })}
      </div>
    </div>
  );
}
