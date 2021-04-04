import React from "react";
import Layout from "../components/Layout.module.css";
import Style from "./Latest.module.css";
import StoryItem from "../components/story-item/StoryItem";
import { ComponentBaseProps, HNStory } from "../types";
import { State } from "../state";
import { RouteName } from "../effects/use-router/RouteName";

export type LatestProps = ComponentBaseProps<State>;

export default function Latest(props: LatestProps) {
  const newStoryList = props.store.state.newStoryList;

  return (
    <div className={Layout.container}>
      <div>
        {newStoryList
          .sort((a, b) => (a.time < b.time ? 1 : -1))
          .slice(0, 200)
          .map((story, i) => (
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
