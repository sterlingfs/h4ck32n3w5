import firebase from "firebase/app";

import { CommentEntry, HNComment } from "../types";
import { getComment } from "./getComment";

type Database = firebase.database.Database;

// TODO have this recursive fetch return if comment is collapsed

export function recursiveFetch(
  entries: CommentEntry[],
  commentId: number,
  depth: number,
  database: Database,
  options?: { depthLimit: number; expanded: Record<string, boolean> }
): Promise<CommentEntry[]> {
  const exceedsDepth =
    options?.depthLimit !== undefined && depth > options.depthLimit;

  const expanded = options?.expanded[commentId];

  if (exceedsDepth && !expanded) {
    return Promise.resolve([]);
  } else {
    return new Promise((resolve) => {
      getComment(commentId, database).then((snap) => {
        const comment: HNComment = { ...snap.val(), depth };
        const kids = comment.kids || [];
        const reqs = kids.map((id) =>
          recursiveFetch(entries, id, depth + 1, database, options)
        );

        Promise.all(reqs)
          .then(
            (kids) => [...entries, [comment, kids.flat()]] as CommentEntry[]
          )
          .then(resolve);
      });
    });
  }
}
