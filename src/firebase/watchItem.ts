import firebase from "firebase/app";
import "firebase/database";
import { Options, DBPath } from "../types";

const initOptions: Options = { eventType: "value" };

export function watchItem(id: string, path: DBPath, options = initOptions) {
  const database = firebase.database();
  const ref = database.ref(`/v0/${path}/${id}`);

  return new Promise((r) => {
    ref.on(options.eventType, r);
  });
}
