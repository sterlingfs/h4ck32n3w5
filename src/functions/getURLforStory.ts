import { HNStory } from "../types";

export const getURLforStory = (story: HNStory) => {
  const BASE_URL = "https://news.ycombinator.com";
  return new URL(story?.url || `${BASE_URL}/item?id=${story?.id}`);
};
