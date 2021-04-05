import firebase from "firebase/app";
import "firebase/database";
import { Snap } from ".";
import { DBPath } from "./enums/DBPath";

type GetItemArgs = { id: string | number; path: DBPath };

export function getItem(args: GetItemArgs, callback: (snap: Snap) => void) {
  const database = firebase.database();
  const ref = database.ref(`/v0/${args.path}/${args.id}`);
  ref.get().then(callback);
  return ref;
}
