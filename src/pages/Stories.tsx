import Layout from "../components/Layout.module.css";
import { useTopStoriesOrderedList } from "../effects/useTopStoriesOrderedList";
import StoryItem from "../components/story-item/StoryItem";
import { BaseProps, RouteName } from "../types";

export type StoriesProps = BaseProps;

export default function Stories(props: StoriesProps) {
  const listItems = useTopStoriesOrderedList();

  return (
    <div className={Layout.container}>
      <div>Stories</div>
      <div>
        {listItems.map((story, i) => (
          <StoryItem
            key={i}
            story={story}
            shouldPushComments={() => {
              props.router.setRoute({
                name: RouteName.comments,
                params: { storyId: story.id },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
