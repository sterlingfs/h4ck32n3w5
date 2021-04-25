import React from "react";
import { HNStory } from "../../types";
import Style from "./StoryItem.module.css";

export type StoryItemProps = {
  index: number;
  story?: HNStory;
  shouldPushComments: () => void;
};

export default function StoryItem(props: StoryItemProps) {
  const { index, story, shouldPushComments } = props;
  const pdate = (t: number) => new Date(t * 1000).toLocaleString();

  const firstComment = story?.firstComment?.text || "";

  return (
    <div className={Style.StoryItem}>
      <div>{index}</div>
      <a href={story?.url || "/"}>{story?.title}</a>
      <div>{story && pdate(story?.time)}</div>
      <div>
        <span>SCORE: {story?.score}</span> |{" "}
        <span>KIDS: {story?.kids?.length}</span> |{" "}
        <span>DESC: {story?.descendants}</span>
      </div>

      {firstComment && (
        <div
          style={{
            borderRadius: "4px",
            // padding: "8px 16px",
            margin: "16px 0",
            boxSizing: "border-box",
            // border: "1px solid lightgray",
          }}
        >
          <div
            style={
              {
                // boxSizing: "border-box",
                // display: "-webkit-box",
                // overflow: "hidden",
                // WebkitBoxOrient: "vertical",
                // WebkitLineClamp: 4,
              }
            }
            dangerouslySetInnerHTML={{ __html: firstComment }}
          >
            {/* {firstComment} */}
          </div>
        </div>
      )}

      <button onClick={shouldPushComments}>comments</button>
    </div>
  );
}
