import firebase from "firebase/app";
import "firebase/database";
import { useEffect, useState } from "react";

import { Item, Snap, User, Comment } from "../types";
import { useSetLocalStorage } from "./useSetLocalStorage";
import { useWatchUser } from "./useWatchUser";

const allSettled = <T>(promises: Promise<T>[], callback: (arg: T[]) => void) =>
  Promise.allSettled(promises).then((res) => {
    callback(res.map((r) => (r as PromiseFulfilledResult<T>).value));
  });

export function useComments(username: string, limit: number = 100) {
  const snap = useWatchUser(username);

  const [comments, setComments] = useState<Snap[]>([]);
  const [replies, setReplies] = useState<Snap[]>([]);

  useEffect(() => {
    const database = firebase.database();
    const user = snap?.val() as User;
    const submitted = user?.submitted ?? [];
    const userComments = submitted
      .slice(0, limit)
      .map((id) => database.ref(`/v0/item/${id}`).get());

    userComments && allSettled(userComments, setComments);
  }, [snap, limit]);

  useEffect(() => {
    const database = firebase.database();
    const getRef = (id: number) => database.ref(`/v0/item/${id}`).get();

    const replies = comments
      .map((snap: Snap) => snap.val())
      .filter((item: Item) => item.type === "comment" && item.kids)
      .map((comment) => comment.kids)
      .map((kids: number[]) => kids?.map(getRef))
      .flat();

    replies && allSettled(replies, setReplies);
  }, [comments]);

  const stream = [...comments, ...replies]
    .map((snap) => [snap.key!, snap.val()] as [key: string, val: Comment])
    .sort((a, b) => (a[1].time < b[1].time ? 1 : -1))
    .slice(0, 100);

  useSetLocalStorage({ commentStream: stream });

  return stream;
}
