import Layout from "../components/Layout.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { ComponentBaseProps, HNStory } from "../types";
import { State } from "../state";
import { RouteName } from "../effects/use-router/RouteName";
import useGetNewStories from "../effects/useGetNewStories";

export type LatestProps = ComponentBaseProps<State>;

export default function Latest(props: LatestProps) {
  const newStoryIds = props.store.state.newStoryIds || [];
  const newStoryList = props.store.state.newStoryList || [];
  const newStoriesOrderedList = useGetNewStories(newStoryIds) ?? newStoryList;

  // .sort((a, b) => (a?.time < b?.time ? 1 : -1)) as HNStory[];

  return (
    <div className={Layout.container}>
      <h2 style={{ paddingLeft: "16px" }}>Latest</h2>
      <div>
        {newStoriesOrderedList.map((item, i) => (
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
