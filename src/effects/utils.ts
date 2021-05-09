import { HNStory, HNComment } from "../types";

export function allSettled<T>(
  promises: Promise<T>[],
  onSettled: (arg: T[]) => void,
  onError: (error: Error) => void = () => {}
) {
  return Promise.allSettled(promises)
    .then((res) => {
      const values = res.map((r) => (r as PromiseFulfilledResult<T>).value);
      onSettled(values);
    })
    .catch(onError);
}

export function replaceItemAtIndex<S>(item: S, list: S[], index: number) {
  const start = list.slice(0, index);
  const end = list.slice(index + 1);
  const newList = [...start, item, ...end];
  return newList;
}

export function appendComments(
  stories: HNStory[],
  comments: HNComment[]
): HNStory[] {
  if (stories.length === 0 || comments.length === 0) return stories;

  const [comment, ...commentsStack] = comments;

  const storyListIndex = stories.findIndex((story) => {
    return story.id === comment.parent;
  });

  const story = storyListIndex >= 0 ? stories[storyListIndex] : undefined;

  const newStory = story && { ...story, firstComment: comment };

  const newStoryList =
    newStory && storyListIndex > -1
      ? replaceItemAtIndex(newStory, stories, storyListIndex)
      : stories;

  return commentsStack.length > 0
    ? appendComments(newStoryList, commentsStack)
    : newStoryList;
}
