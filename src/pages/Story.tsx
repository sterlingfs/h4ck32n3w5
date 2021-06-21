import Layout from "../components/Layout.module.css";
import { useEffect } from "react";
import CommentItem from "../components/comment-item/CommentItem";

import StoryItem from "../components/story-item/StoryItem";
import { ActionType } from "../enums/ActionType";
import { ComponentBaseProps } from "./types";

export type StoryProps = ComponentBaseProps;

export default function Story(props: StoryProps) {
  const dispatch = props.store.dispatch;
  const { story, comments } = props.store.state.storyPage;

  useEffect(() => {
    return () => {
      dispatch({
        type: ActionType.getStory,
        payload: { story: undefined, comments: undefined },
      });
    };
  }, [dispatch]);

  return (
    <div className={Layout.container}>
      {story && (
        <StoryItem rank={1} story={story} shouldPushComments={() => {}} />
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
