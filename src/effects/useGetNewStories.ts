import * as localforage from "localforage";
import { useEffect, useState } from "react";
import { useGetList } from "./useGetList";

export default function useGetNewStories(ids: number[]) {
  const dataList = useGetList(ids).map((data) => data.item);

  useEffect(() => {
    localforage.setItem("newStoryList", dataList);
  }, [dataList]);

  return dataList;
}
