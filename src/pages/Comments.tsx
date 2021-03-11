import firebase from "firebase/app";

import Layout from "../components/Layout.module.css";
import { useEffect, useState } from "react";
import { getItem } from "../firebase";
import { BaseProps, Story, Comment } from "../types";
import CommentItem from "../components/comment-item/CommentItem";
import { DBPath } from "../firebase/enums/DBPath";

export type CommentsProps = BaseProps;

const database = firebase.database();

export default function Comments(props: CommentsProps) {
  const storyId = props.router.route?.params?.storyId;

  const [story, setStory] = useState<Story>();

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    storyId &&
      getItem(storyId, DBPath.item).then((snap) => setStory(snap.val()));
  }, [storyId]);

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
          // TODO Replace with ReplyItem

          <CommentItem key={i} comment={comment} isOwner={false} />
        ))}
      </div>
    </div>
  );
}
