import * as localforage from "localforage";
import { useEffect } from "react";
import { ActionType } from "../enums/ActionType";
import { State } from "../state";
import { Dispatch } from "../types";
import { useGetList } from "./useGetList";

export default function useGetTopStories(ids: number[], dispatch: Dispatch) {
  // TODO Cache the list and dispatch

  const dataList = useGetList(ids)
    .sort((a, b) => (a.index > b.index ? 1 : -1))
    .map((data) => data.item);

  useEffect(() => {
    // TODO Move the fetch to inside this hook OPTIONAL

    dataList.length > 0 &&
      localforage.setItem("topStoryList", dataList).then(() => {
        dispatch({
          type: ActionType.setState,
          payload: { topStoryList: dataList } as Pick<State, "topStoryList">,
        });
      });
  }, [dataList, dispatch]);

  return dataList;
}
