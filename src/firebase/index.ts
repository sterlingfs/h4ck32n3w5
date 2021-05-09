import firebase from "firebase/app";
import "firebase/database";

export { getItem } from "./getItem";
export { watchItem } from "./watchItem";

export type EventType = firebase.database.EventType;
export type Snap = firebase.database.DataSnapshot;
export type Once = firebase.database.Reference["once"];
export type On = firebase.database.Reference["on"];

// TODO #6 Consolidate firebase imports to here
