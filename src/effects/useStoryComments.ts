import { useEffect, useReducer } from "react";
import { Story } from "../types";

export function useStoryComments(story: Story) {
  const [comments, dispatchComment] = useReducer(
    (comments: Comment[], comment: Comment) => [...comments, comment],
    []
  );
  useEffect(() => {}, [story]);

  return comments;
}
