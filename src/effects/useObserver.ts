import firebase from "firebase/app";
import "firebase/database";

import { useState, useEffect } from "react";
import { DBPath, EventType, Snap } from "../types";

export type Options = {
  eventType: EventType;
  path: DBPath;
};

const initOptions: Options = { eventType: "value", path: DBPath.item };

export function useObserver(id: string, opts: Partial<Options> = initOptions) {
  const { eventType, path } = { ...initOptions, ...opts } as Options;
  const [item, setItem] = useState<Snap>();

  useEffect(() => {
    const database = firebase.database();
    const ref = database.ref(`/v0/${path}/${id}`);
    ref.on(eventType, setItem);
    return () => ref.off(eventType, setItem);
  }, [id, eventType, path]);

  return item;
}
