import { useEffect, useState } from "react";
import { DBPath } from "../firebase/enums/DBPath";
import { getItem } from "../firebase/getItem";
import { HNItem } from "../types";

export function useGetList(ids: number[]) {
  const [dataList, setDataList] = useState<{ index: number; item: HNItem }[]>(
    []
  );

  useEffect(() => {
    if (ids) {
      const snapsReq = ids.map(async (id, index) => {
        const item = await getItem({ id, path: DBPath.item });
        return { index, item: item?.val() };
      });

      Promise.allSettled(snapsReq).then((promiseSettledResultList) => {
        setDataList(promiseSettledResultList.map((req: any) => req.value));
      });
    }
  }, [ids]);

  return dataList;
}
