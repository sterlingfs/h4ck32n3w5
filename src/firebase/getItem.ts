import firebase from "firebase/app";
import "firebase/database";
import { DBPath } from "./enums/DBPath";

export function getItem(
  id: string | number,
  path: DBPath
): Promise<firebase.database.DataSnapshot> {
  const database = firebase.database();
  const ref = database.ref(`/v0/${path}/${id}`);
  return ref.get();
}
