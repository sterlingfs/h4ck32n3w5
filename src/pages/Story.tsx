import "firebase/database";

import firebase from "firebase/app";
import { useEffect } from "react";

import CommentItem from "../components/comment-item/CommentItem";
import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { ActionType } from "../enums/ActionType";
import { ComponentBaseProps } from "./types";
import { HNStory } from "../types";
import { NetworkStatus } from "../enums/NetworkStatus";
import { Payload } from "../mutations";

export type StoryProps = ComponentBaseProps;
type P = Payload<ActionType.setStory>;

const database = firebase.database();

export default function Story(props: StoryProps) {
  const { story, comments } = props.store.state.storyPage;
  const storyId = props.router.route?.params?.storyId;
  const dispatch = props.store.dispatch;

  const rank = story?.id
    ? props.store.state.app.topStoryIds.indexOf(story.id) + 1
    : null;

  useEffect(() => {
    const payload: P = {
      status: NetworkStatus.awaiting,
      story: null,
      comments: [],
    };
    dispatch({ type: ActionType.setStory, payload });

    database.ref(`/v0/item/${storyId}`).on("value", (storySnap) => {
      const { kids } = storySnap.val() as HNStory;
      // TODO lift function
      const getRequest = (id: number) => database.ref(`/v0/item/${id}`).get();
      const requests = kids.map(getRequest);

      Promise.all(requests).then((kidSnaps) => {
        const payload: P = {
          status: NetworkStatus.resolved,
          story: storySnap.val(),
          comments: kidSnaps.map((c) => c.val()),
        };

        dispatch({ type: ActionType.setStory, payload });
      });

      return () => {
        storySnap.ref.off();
        kids.forEach((id) => database.ref(`/v0/item/${id}`).off());
      };
    });
  }, [storyId, dispatch]);

  return (
    <div className={Layout.container}>
      {story && (
        <StoryItem rank={rank} story={story} shouldPushComments={() => {}} />
      )}
      <div>
        {comments &&
          comments.map((comment, i) => (
            <CommentItem key={i} comment={comment} isOwner={false} />
          ))}
      </div>
    </div>
  );
}
