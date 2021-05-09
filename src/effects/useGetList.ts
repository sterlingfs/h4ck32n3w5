import { useEffect, useState } from "react";
import { DBPath } from "../firebase/enums/DBPath";
import { getItem } from "../firebase/getItem";
import { Data, HNItem } from "../types";

export function useGetList<S = HNItem>(ids: number[]) {
  const [dataList, setDataList] = useState<Data<S>[]>([]);

  useEffect(() => {
    if (ids) {
      const snapsReq = ids.map(async (id, index) => {
        const item = id ? await getItem({ id, path: DBPath.item }) : undefined;
        return { index, item: item && item.val() };
      });

      Promise.allSettled(snapsReq).then((promiseSettledResultList) => {
        setDataList(promiseSettledResultList.map((req: any) => req.value));
      });
    }
  }, [ids]);

  return dataList;
}
