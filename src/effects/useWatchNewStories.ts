import { useWatchList } from "./useWatchList";
import { ActionType } from "../enums/ActionType";
import { Dispatch } from "../types";

export default function useWatchNewStories(ids: number[], dispatch: Dispatch) {
  return useWatchList({ ids, type: ActionType.setNewStoryRecord }, dispatch);
}
