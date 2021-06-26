import firebase from "firebase/app";

import { CommentEntry, HNComment } from "../types";

export const recursiveFetch = (
  entries: CommentEntry[],
  commentId: number,
  depth: number,
  database: firebase.database.Database
): Promise<CommentEntry[]> => {
  const getRequest = (id: number) => database.ref(`/v0/item/${id}`).get();
  return new Promise((resolve) => {
    getRequest(commentId).then((snap) => {
      const comment: HNComment = { ...snap.val(), depth };
      const kids = comment.kids || [];
      const reqs = kids.map((id) =>
        recursiveFetch(entries, id, depth + 1, database)
      );

      Promise.all(reqs)
        .then((kids) => [...entries, [comment, kids.flat()]] as CommentEntry[])
        .then(resolve);
    });
  });
};
