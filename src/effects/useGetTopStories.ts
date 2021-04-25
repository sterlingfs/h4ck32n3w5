import * as localforage from "localforage";
import { useEffect, useState } from "react";
import { ActionType } from "../enums/ActionType";
import { getItems } from "../firebase/getItems";
import { State } from "../state";
import { Dispatch, HNComment, HNItem, HNStory } from "../types";
import { useGetList } from "./useGetList";
import { appendComments, replaceItemAtIndex } from "./utils";

export default function useGetTopStories(ids: number[], dispatch: Dispatch) {
  const [stories, setStories] = useState<HNStory[]>([]);
  const [comments, setComments] = useState<HNComment[]>([]);
  const [topStoryList, setTopStoryList] = useState<HNStory[]>([]);

  // function getTopCommentIds(stories: HNStory[]) {
  //   return stories
  //     .slice(0, 20)
  //     .map(({ kids }) => (kids?.length > 0 ? kids[0] : -1))
  //     .filter((id) => id > 0);
  // }

  useEffect(() => {
    getItems<HNStory>(ids).then((stories) => {
      setStories(stories.sort((a, b) => (a.index > b.index ? 1 : -1)));
    });
  }, [ids]);

  // useEffect(() => {
  //   const commentIds = getTopCommentIds(stories);
  //   getItems<HNComment>(commentIds).then(setComments);
  // }, [stories]);

  useEffect(() => {
    // if (comments.length > 0 && stories.length > 0) {
    if (stories.length > 0) {
      const topComments = comments.slice(0, 3);
      const storyList = appendComments(stories, topComments);
      setTopStoryList(storyList);
    }
  }, [stories, comments]);

  useEffect(() => {
    if (topStoryList.length > 0) {
      localforage.setItem("topStoryList", topStoryList).then(() => {
        dispatch({
          type: ActionType.setState,
          payload: { topStoryList } as Pick<State, "topStoryList">,
        });
      });
    }
  }, [topStoryList, dispatch]);
}
