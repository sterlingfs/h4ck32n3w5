import firebase from "firebase/app";
import { useState, useEffect } from "react";
import { Snap, Item } from "../types";
import { allSettled } from "./utils";

export default function useCommentReplies(comments: Snap[]) {
  const [replies, setReplies] = useState<Snap[]>([]);

  useEffect(() => {
    const database = firebase.database();
    const getRef = (id: number) => database.ref(`/v0/item/${id}`).get();

    const databaseRequest = comments
      .map((snap: Snap) => snap.val())
      .filter((item: Item) => item.type === "comment" && item.kids)
      .map((comment) => comment.kids)
      .map((kids: number[]) => kids?.map(getRef))
      .flat();

    databaseRequest && allSettled<Snap>(databaseRequest, setReplies);
  }, [comments]);

  return replies;
}
