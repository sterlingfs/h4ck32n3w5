import firebase from "firebase/app";
import "firebase/database";

import { DBPath } from "./enums/DBPath";

type GetItemArgs = { id: string | number; path: DBPath };

export function getItem(args: GetItemArgs) {
  if (args.id && args.path) {
    const database = firebase.database();
    const ref = database.ref(`/v0/${args.path}/${args.id}`);
    return ref.get();
  }
}
