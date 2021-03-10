import firebase from "firebase/app";
import { useState, useEffect } from "react";
import { Snap, Comment } from "../types";
import { allSettled } from "./utils";

export default function useCommentReplies(comments: Comment[]) {
  const [replies, setReplies] = useState<Snap[]>([]);

  useEffect(() => {
    const database = firebase.database();
    const getRef = (id: number) => database.ref(`/v0/item/${id}`);

    const commentRefs = comments
      .filter((item: Comment) => item.type === "comment" && item.kids)
      .map((comment) => comment.kids)
      .map((kids: number[]) => kids?.map(getRef))
      .flat();

    commentRefs &&
      allSettled<Snap>(
        commentRefs.map((ref) => ref.get()),
        setReplies
      );

    return () => commentRefs.forEach((ref) => ref.off());
  }, [comments]);

  return replies.map((snap) => snap.val());
}