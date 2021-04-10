import * as localforage from "localforage";
import { useEffect, useState } from "react";
import { useGetList } from "./useGetList";

export default function useGetTopStories(ids: number[]) {
  const dataList = useGetList(ids).map((data) => data.item);

  useEffect(() => {
    localforage.setItem("topStoryList", dataList);
  }, [dataList]);

  return dataList;
}
