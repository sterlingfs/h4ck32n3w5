import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { ComponentBaseProps, HNStory } from "../types";
import { RouteName } from "../effects/use-router/RouteName";
import { State } from "../state";

export type StoriesProps = ComponentBaseProps<State>;

export default function Stories(props: StoriesProps) {
  const listItems = props.store.state.storyRecord;
  const topStoryIds = props.store.state.topStoryIds || [];
  const topStoriesOrderedList = topStoryIds.reduce(
    (stories: HNStory[], id: number) => {
      const listItem = listItems[id];
      return listItem ? [...stories, listItem] : stories;
    },
    [] as HNStory[]
  );

  return (
    <div className={Layout.container}>
      <div>
        {topStoriesOrderedList.slice(0, 100).map((story, i) => (
          <StoryItem
            key={i}
            index={i}
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
