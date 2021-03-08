import { getSegment } from "./getSegment";
import { Segment } from "../types";

export function getSegments(
  pathname: string,
  configPathname: string
): Segment[] | undefined {
  const splits = configPathname.split("/");
  const pathnameParams = pathname.split("/");

  return splits.length === pathnameParams.length
    ? splits.reduce((params: Segment[] | undefined, rawParam: string, i) => {
        if (params === undefined) {
          return undefined;
        } else {
          const param = getSegment(pathnameParams[i], rawParam);
          const isMatch =
            param.type === "variable" ||
            (param.type === "static" && param.key === pathnameParams[i]);
          return isMatch ? [...params, param] : undefined;
        }
      }, [])
    : undefined;
}
