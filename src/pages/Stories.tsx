import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { ComponentBaseProps, HNStory } from "../types";
import { RouteName } from "../effects/use-router/RouteName";
import { State } from "../state";
import useGetTopStories from "../effects/useGetTopStories";

export type StoriesProps = ComponentBaseProps<State>;

export default function Stories(props: StoriesProps) {
  const topStoryIds = props.store.state.topStoryIds || [];
  const topStoryList = props.store.state.topStoryList || [];
  const topStoriesOrderedList = useGetTopStories(topStoryIds) ?? topStoryList;

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Top Stories</h2>
      <div>
        {topStoriesOrderedList.slice(0, 100).map((item, i) => (
          <StoryItem
            key={i}
            index={i}
            story={item as HNStory}
            shouldPushComments={() => {
              props.router.setRoute({
                name: RouteName.comments,
                params: { storyId: item.id },
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
