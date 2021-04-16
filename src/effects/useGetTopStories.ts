import * as localforage from "localforage";
import { useEffect } from "react";
import { useGetList } from "./useGetList";

export default function useGetTopStories(ids: number[]) {
  const dataList = useGetList(ids)
    .sort((a, b) => (a.index > b.index ? 1 : -1))
    .map((data) => data.item);

  useEffect(() => {
    dataList.length > 0 && localforage.setItem("topStoryList", dataList);
  }, [dataList]);

  return dataList;
}
