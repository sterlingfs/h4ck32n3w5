import * as localforage from "localforage";
import { useEffect } from "react";
import { ActionType } from "../enums/ActionType";
import { getItems } from "../firebase/getItems";
import { State } from "../state";
import { Dispatch, HNStory } from "../types";

export default function useGetTopStories(
  ids: number[],
  dispatch: Dispatch
): void {
  useEffect(() => {
    getItems<HNStory>(ids).then((stories) => {
      if (stories.length > 0) {
        const topStoryList = stories.sort((a, b) =>
          a.index > b.index ? 1 : -1
        );

        localforage.setItem("topStoryList", topStoryList).then(() => {
          dispatch({
            type: ActionType.setState,
            payload: { topStoryList } as Pick<State, "topStoryList">,
          });
        });
      }
    });
  }, [ids, dispatch]);
}
