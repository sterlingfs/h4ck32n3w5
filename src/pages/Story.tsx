import { getDatabase } from "@firebase/database";

import Layout from "../components/Layout.module.css";
import { useEffect, useState } from "react";
import { ComponentBaseProps, HNStory, HNComment } from "../types";
import CommentItem from "../components/comment-item/CommentItem";
import { State } from "../state";

export type StoryProps = ComponentBaseProps<State>;

// const database = getDatabase();

export default function Story(props: StoryProps) {
  const storyId = props.router.route?.params?.storyId;

  const [story, setStory] = useState<HNStory>();

  const [comments, setComments] = useState<HNComment[]>([]);

  // useEffect(() => {
  //   console.log("kids", story);

  //   const requests = story?.kids
  //     .slice(0, 30)
  //     .map((id) => database.ref(`/v0/item/${id}`).get());

  //   requests &&
  //     Promise.all(requests).then((results) => {
  //       console.log("results", results);

  //       setComments(results.map((snap) => snap.val()));
  //     });

  //   return () =>
  //     story?.kids
  //       .slice(0, 30)
  //       .forEach((id) => database.ref(`/v0/item/${id}`).off());
  // }, [story]);

  return (
    <div className={Layout.container}>
      <div>Story ---</div>

      <div>
        {comments.map((comment, i) => (
          <CommentItem key={i} comment={comment} isOwner={false} />
        ))}
      </div>
    </div>
  );
}
