import firebase from "firebase/app";
import { useState, useEffect } from "react";
import { DBPath, Options, Snap } from "../types";

export function useObserver(
  id: string | number | undefined,
  path: DBPath,
  opts?: Options
) {
  const [item, setItem] = useState<Snap>();

  useEffect(() => {
    const eventType = opts?.eventType || "value";
    const database = firebase.database();
    const ref = database.ref(`/v0/${path}/${id}`);
    ref.on(eventType || "value", setItem);
    return ref.off;
  }, [id, path, opts]);
  return item;
}
