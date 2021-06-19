import "firebase/database";

import firebase from "firebase/app";

import { DBPath } from "../enums/DBPath";
import { HNComment, HNStory } from "../types";

const database = firebase.database();

export async function getRootStory(itemId: number): Promise<HNStory | null> {
  const item = await database
    .ref(`/v0/${DBPath.item}/${itemId}`)
    .get()
    .then((snap) => snap.val() as HNStory | HNComment);

  if (item.type === "story") {
    return item;
  } else if (item.type === "comment") {
    return getRootStory(item.parent);
  } else {
    return null;
  }
}
