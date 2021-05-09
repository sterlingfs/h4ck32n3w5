import firebase from "firebase/app";
import "firebase/database";
import { Options } from "../types";

export async function getOnce(opts: Options) {
  if (opts.id && opts.path) {
    const database = firebase.database();
    const ref = database.ref(`/v0/${opts.path}/${opts.id}`);
    return ref.once("value");
  }
}
