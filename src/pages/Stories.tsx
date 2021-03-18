import Layout from "../components/Layout.module.css";
import { useTopStoriesOrderedList } from "../effects/useTopStoriesOrderedList";
import StoryItem from "../components/story-item/StoryItem";
import { BaseProps } from "../types";
import { RouteName } from "../effects/use-router/RouteName";

export type StoriesProps = BaseProps;

export default function Stories(props: StoriesProps) {
  const listItems = useTopStoriesOrderedList();

  // How cache the list items

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
