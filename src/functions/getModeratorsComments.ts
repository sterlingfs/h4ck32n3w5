import "firebase/database";

import firebase from "firebase/app";

import { DBPath } from "../enums/DBPath";
import { HNComment, HNUser } from "../types";

const database = firebase.database();
const GUIDE_LINES = "newsguidelines.html";

export async function getModeratorsComments(user: HNUser) {
  const isModeration = (c: HNComment) =>
    c?.type === "comment" && c?.text?.includes(GUIDE_LINES);

  const requests = user.submitted
    .slice(0, 500)
    .map((id) => database.ref(`/v0/${DBPath.item}/${id}`).get());

  const warnings = await Promise.all(requests).then((response) =>
    response
      .map((commentSnap) => commentSnap.val() as HNComment)
      .filter(isModeration)
  );

  return warnings;
}
