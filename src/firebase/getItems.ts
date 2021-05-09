import firebase from "firebase/app";
import "firebase/database";
import { DBPath } from "./enums/DBPath";

type Fullfilled<S> = PromiseFulfilledResult<S>;
type Options = { path: DBPath };

const options: Options = { path: DBPath.item };

export function getItems<S>(ids: number[], opts = options) {
  const ps = ids.map((id, index) => {
    const database = firebase.database();
    const ref = database.ref(`/v0/${opts.path}/${id}`);
    return ref.get().then((snap) => ({ ...(snap?.val() as S), index }));
  });

  return Promise.allSettled(ps).then((result) =>
    result.map((req) => (req as Fullfilled<S>).value)
  );
}
