import firebase from "firebase/app";
import "firebase/database";
import { Options } from "../types";
import { DBPath } from "./enums/DBPath";

export function watchItem(id: string, path: DBPath, options: Options) {
  const database = firebase.database();
  const ref = database.ref(`/v0/${path}/${id}`);

  return new Promise((r) => {
    ref.on(options.eventType || "value", r);
  });
}
