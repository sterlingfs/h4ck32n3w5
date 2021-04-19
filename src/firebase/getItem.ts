import firebase from "firebase/app";
import "firebase/database";

import { DBPath } from "./enums/DBPath";

type Options = { id: string | number; path: DBPath };

export function getItem(opts: Options) {
  if (opts.id && opts.path) {
    const database = firebase.database();
    const ref = database.ref(`/v0/${opts.path}/${opts.id}`);
    return ref.get();
  }
}
