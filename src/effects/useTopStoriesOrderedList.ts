import { useTopStoryIds } from "../effects/useTopStoryIds";
import { useTopStories } from "../effects/useTopStories";
// import { useSetLocalStorage } from "./useSetLocalStorage";

export function useTopStoriesOrderedList() {
  const topStoryIds = useTopStoryIds();
  const topStories = useTopStories(topStoryIds);

  const topStoriesOrderedList = topStoryIds
    .slice(0, 99)
    .map((id) => topStories[id])
    .filter((story) => story !== undefined);

  // useSetLocalStorage({ topStoriesOrderedList });

  return topStoriesOrderedList;
}
