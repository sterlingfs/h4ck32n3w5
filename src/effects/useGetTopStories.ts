import * as localforage from "localforage";
import { useEffect, useState } from "react";
import { ActionType } from "../enums/ActionType";
import { getItems } from "../firebase/getItems";
import { State } from "../state";
import { Dispatch, HNComment, HNItem, HNStory } from "../types";
import { useGetList } from "./useGetList";

export default function useGetTopStories(ids: number[], dispatch: Dispatch) {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [comments, setComments] = useState<HNComment[]>([]);
  const [topStoryList, setTopStoryList] = useState<HNStory[]>([]);

  useEffect(() => {
    getItems<HNStory>(ids).then((stories) => {
      setStories(stories.sort((a, b) => (a.index > b.index ? 1 : -1)));
    });
  }, [ids]);

  useEffect(() => {
    const commentIds = getTopCommentIds(stories);
    getItems<HNComment>(commentIds).then(setComments);
  }, [stories]);

  useEffect(() => {
    console.log("comments", comments);

    setTopStoryList(stories);
  }, [stories, comments]);

  useEffect(() => {
    if (topStoryList.length > 0) {
      dispatch({
        type: ActionType.setState,
        payload: { topStoryList } as Pick<State, "topStoryList">,
      });
    }
  }, [topStoryList, dispatch]);

  return [];
}

function getTopCommentIds(stories: HNStory[]) {
  return stories
    .slice(0, 20)
    .map(({ kids }) => (kids?.length > 0 ? kids[0] : -1))
    .filter((id) => id > 0);
}
