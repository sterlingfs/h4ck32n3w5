import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import useGetTopStories from "../effects/useGetTopStories";
import { ComponentBaseProps, HNStory } from "../types";
import { RouteName } from "../effects/use-router/RouteName";
import { State } from "../state";

export type StoriesProps = ComponentBaseProps<State>;

export default function Stories(props: StoriesProps) {
  const { state, dispatch } = props.store;
  useGetTopStories(state.topStoryIds, dispatch);

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Top Stories</h2>
      <div>
        {state.topStoryList.slice(0, 100).map((item, i) => (
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
