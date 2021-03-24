import { useEffect, useState } from "react";
import firebase from "firebase/app";
import { HNComment } from "../types";

const database = firebase.database();

export default function useComments(
  ids: number[],
  callback: (comments: HNComment[]) => void,
  range: [number, number] = [0, 100]
) {
  useEffect(() => {
    const docRefs = ids
      .slice(range[0], range[1])
      .map((id) => database.ref(`/v0/item/${id}`));
    const requests = docRefs.map((doc) => doc.get());

    Promise.all(requests).then((results) => {
      const comments = results.map((snap) => snap.val());
      callback(comments);
    });

    return () => {
      docRefs.forEach((doc) => doc.off());
    };
  }, [ids, callback, range]);
}
