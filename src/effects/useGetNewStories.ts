import * as localforage from "localforage";
import { useEffect } from "react";
import { useGetList } from "./useGetList";

export default function useGetNewStories(ids: number[]) {

  
  const dataList = useGetList(ids)
    .sort((a, b) => (a.item?.time < b.item?.time ? 1 : -1))
    .map((data) => data.item);

  useEffect(() => {
    localforage.getItem("newStoryList");
  }, []);

  useEffect(() => {
    dataList.length > 0 && localforage.setItem("newStoryList", dataList);
  }, [dataList]);

  return dataList;
}
