import { ActionType } from "../enums/ActionType";
import { Dispatch } from "../types";
import { useWatchList } from "./useWatchList";

export default function useWatchTopStories(ids: number[], dispatch: Dispatch) {
  return useWatchList({ ids, type: ActionType.emitNewStory }, dispatch);
}
