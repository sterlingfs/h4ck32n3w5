import firebase from "firebase/app";
import "firebase/database";

export { getItem } from "./getItem";
export { watchItem } from "./watchItem";

export type EventType = firebase.database.EventType;
export type Snap = firebase.database.DataSnapshot;



// TODO #6 Consolidate firebase imports to here