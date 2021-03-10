import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { Comment } from "../types";

const database = firebase.database();

export default function useComments(
  ids: number[],
  range: [number, number] = [0, 100]
): Comment[] {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const docRefs = ids
      .slice(range[0], range[1])
      .map((id) => database.ref(`/v0/item/${id}`));
    const requests = docRefs.map((doc) => doc.get());

    Promise.all(requests).then((results) =>
      setComments(results.map((snap) => snap.val()))
    );

    return () => {
      docRefs.forEach((doc) => doc.off());
    };
  }, [ids, range]);

  return comments;
}
