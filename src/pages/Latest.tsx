import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { ComponentBaseProps, HNStory } from "../types";
import { State } from "../state";
import { RouteName } from "../effects/use-router/RouteName";
import useGetNewStories from "../effects/useGetNewStories";

export type LatestProps = ComponentBaseProps<State>;

export default function Latest(props: LatestProps) {
  const { state, dispatch } = props.store;
  useGetNewStories(state.newStoryIds, dispatch);

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Latest News</h2>
      <div>
        {state.newStoryList.map((item, i) => (
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
