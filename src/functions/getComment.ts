import firebase from "firebase/app";

export type Database = firebase.database.Database;

export function getComment(id: number, database: Database) {
  return database.ref(`/v0/item/${id}`).get();
}
