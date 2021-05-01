import "firebase/database";

import firebase from "firebase/app";

import { Options } from "../types";
import { On } from "./";

type SuccessCallback = Parameters<On>[1];

export function watchItem(opts: Options, callback: SuccessCallback) {
  const database = firebase.database();
  const ref = database.ref(`/v0/${opts.path}/${opts.id}`);
  ref.on(opts.eventType || "value", callback);
  return ref;
}
