import * as localforage from "localforage";
import { useEffect } from "react";
import { State } from "../state";
import { Dispatch, HNStory } from "../types";
import { ActionType } from "../enums/ActionType";
import { useGetList } from "./useGetList";

export default function useGetNewStories(
  ids: number[],
  dispatch: Dispatch
): void {
  const dataList = useGetList<HNStory>(ids)
    .sort((a, b) => (a.item?.time < b.item?.time ? 1 : -1))
    // .filter((data) => {
    //   const f = data?.item?.id !== undefined;
    //   f ?? console.log(">>>", data);
    //   return f;
    // })
    .map((data) => data.item);

  useEffect(() => {
    if (dataList.length > 0) {
      const newStoryList: State["newStoryList"] = dataList.map(
        (story, index) => ({
          index,
          id: story?.id,
          item: story,
        })
      );

      localforage.setItem("newStoryList", newStoryList).then(() => {
        dispatch({
          type: ActionType.setState,
          payload: { newStoryList },
        });
      });
    }
  }, [dataList, dispatch]);
}
