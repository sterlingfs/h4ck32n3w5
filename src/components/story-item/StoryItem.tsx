import React from "react";
import { Story } from "../../types";
import Style from "./StoryItem.module.css";

export type StoryItemProps = {
  story: Story;
  shouldPushComments: () => void;
};

export default function StoryItem(props: StoryItemProps) {
  const { story, shouldPushComments } = props;
  const pdate = (t: number) => new Date(t * 1000).toLocaleString();

  return (
    <div className={Style.StoryItem}>
      <a href={story.url}>{story.title}</a>
      <div>{pdate(story.time)}</div>
      <div>
        <span>SCORE: {story.score}</span> |{" "}
        <span>KIDS: {story.kids?.length}</span> |{" "}
        <span>DESC: {story.descendants}</span>
      </div>

      <button onClick={shouldPushComments}>comments</button>
    </div>
  );
}
