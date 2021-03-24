import { useEffect, useReducer } from "react";
import { HNStory } from "../types";

export function useStoryComments(story: HNStory) {
  const [comments, dispatchComment] = useReducer(
    (comments: Comment[], comment: Comment) => [...comments, comment],
    []
  );
  useEffect(() => {}, [story]);

  return comments;
}
