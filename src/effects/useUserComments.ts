import firebase from "firebase";
import { useEffect, useState } from "react";
import { User, Comment } from "../types";

export default function useUserComments(
  user?: User,
  range: [number, number] = [0, 100]
): Comment[] {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (user) {
      console.log("EFFECT_FIRE", user.id);

      const database = firebase.database();
      const submitted = user.submitted ?? [];
      const docRefs = submitted
        .slice(range[0], range[1])
        .map((id) => database.ref(`/v0/item/${id}`));

      const requests = docRefs.map((doc) => doc.get());

      console.log("docrefs length", docRefs.length);

      Promise.all(requests).then((results) =>
        setComments(results.map((snap) => snap.val()))
      );

      // const comment: Partial<Comment> = { id: 23, by: "spome" };

      // setComments([comment] as any[]);

      return () => {
        docRefs.forEach((doc) => doc.off());
      };
    }
  }, [user, range]);

  return comments;
}
