import firebase from "firebase/app";
import "firebase/database";

import { Comment, User } from "../types";
import { useState, useEffect } from "react";

export function useUserReplies(
  user?: User,
  options = { start: 0, end: 100 }
): Comment[] {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (user) {
      const database = firebase.database();
      const submitted = user?.submitted ?? [];

      const docRefs = submitted
        .slice(options.start, options.end)
        .map((id) => database.ref(`/v0/item/${id}`));

      const requests = docRefs.map((doc) => doc.get());

      Promise.all(requests).then((results) =>
        setComments(results.map((snap) => snap.val()))
      );

      return () => {
        docRefs.forEach((doc) => doc.off());
      };
    }
  }, [user, options]);

  return comments;
}
