import Layout from "../components/Layout.module.css";
import { useTopStoriesOrderedList } from "../effects/useTopStoriesOrderedList";
import StoryItem from "../components/story-item/StoryItem";
import { BaseProps } from "../types";

export type StoriesProps = BaseProps;

export default function Stories(props: StoriesProps) {
  const listItems = useTopStoriesOrderedList();

  return (
    <div className={Layout.container}>
      {listItems.map((story, i) => (
        <StoryItem key={i} story={story} shouldPushComments={() => {}} />
      ))}
    </div>
  );
}
