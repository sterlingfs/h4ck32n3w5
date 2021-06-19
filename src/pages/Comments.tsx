import "firebase/database";

import firebase from "firebase/app";
import { useEffect, useState } from "react";

import CommentItem from "../components/comment-item/CommentItem";
import Layout from "../components/Layout.module.css";

import { HNComment, HNStory } from "../types";
import { ComponentBaseProps } from "./types";

export type CommentsProps = ComponentBaseProps;

const database = firebase.database();

export default function Comments(props: CommentsProps) {
  const storyId = props.router.route?.params?.storyId;

  const [story, setStory] = useState<HNStory>();

  const [comments, setComments] = useState<HNComment[]>([]);

  useEffect(() => {
    const docRefs = story?.kids
      .slice(0, 30)
      .map((id) => database.ref(`/v0/item/${id}`));

    const requests = docRefs?.map((doc) => doc.get());

    requests &&
      Promise.all(requests).then((results) =>
        setComments(results.map((snap) => snap.val()))
      );

    return () => {
      docRefs && docRefs.forEach((doc) => doc.off());
    };
  }, [story]);

  return (
    <div className={Layout.container}>
      <div>Comments</div>

      <div>
        {comments.map((comment, i) => (
          <CommentItem key={i} comment={comment} isOwner={false} />
        ))}
      </div>
    </div>
  );
}
