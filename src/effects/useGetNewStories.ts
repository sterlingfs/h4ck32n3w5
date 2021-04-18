import * as localforage from "localforage";
import { useEffect } from "react";
import { State } from "../state";
import { Dispatch } from "../types";
import { ActionType } from "../enums/ActionType";
import { useGetList } from "./useGetList";

export default function useGetNewStories(ids: number[], dispatch: Dispatch) {
  const dataList = useGetList(ids)
    .sort((a, b) => (a.item?.time < b.item?.time ? 1 : -1))
    .map((data) => data.item);

  useEffect(() => {
    dataList.length > 0 &&
      localforage.setItem("topStoryList", dataList).then(() => {
        dispatch({
          type: ActionType.setState,
          payload: { newStoryList: dataList } as Pick<State, "newStoryList">,
        });
      });
  }, [dataList, dispatch]);

  return dataList;
}
