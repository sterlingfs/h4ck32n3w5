import { Segment } from "../types";

export function getSegment(pathname: string, rawParam: string): Segment {
  return rawParam.slice(0, 1) === ":"
    ? { type: "variable", key: rawParam.slice(1), value: pathname }
    : { type: "static", key: rawParam, value: null };
}
