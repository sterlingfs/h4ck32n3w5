import { DBPath } from "../types";
import { useObserver } from "./useObserver";

export const useWatchUser = (id: string) =>
  useObserver(id, { path: DBPath.user });
