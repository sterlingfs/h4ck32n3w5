import React from "react";

// import Typo from "../../Typography.module.css";

import { HNStory } from "../../types";
import Style from "./StoryItem.module.css";

export type StoryItemProps = {
  index: number;
  story?: HNStory;
  id?: number;
  shouldPushComments: () => void;
};

const parseDate = (t: number) =>
  new Date(t * 1000).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

export default function StoryItem(props: StoryItemProps) {
  const { index, story, id, shouldPushComments } = props;

  const firstComment = story?.firstComment?.text || "";

  const url = story?.url && new URL(story?.url);
  const host = url ? url.hostname : "";

  return (
    <div
      className={Style.StoryItem}
      style={{ display: "grid", gridTemplateColumns: "64px 1fr" }}
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "baseline",
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: "normal" }}>#{index}</span>
        {/* <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            opacity: 0.6,
            letterSpacing: -0.3,
            paddingLeft: "16px",
          }}
        >
          {story?.score} points
        </span> */}
      </div>
      <div>
        <a
          href={story?.url || "/"}
          style={{
            fontSize: "18px",
            color: "rgba(0,0,0,0.95)",
            textDecoration: "none",
            letterSpacing: -0.1,
          }}
        >
          <span>{story?.title}</span>
          <span style={{ opacity: 0.5, fontSize: "16px" }}>
            {host && ` (${host})`}
          </span>
        </a>
        <div
          style={{
            // fontSize: "16px",
            // opacity: 0.8,
            // letterSpacing: -0.3,
            margin: "4px 0 16px",

            fontSize: "14px",
            // fontWeight: "bold",
            // textTransform: "uppercase",
            opacity: 0.6,
            letterSpacing: -0.5,
          }}
        >
          {story && `${parseDate(story?.time)} by ${story?.by}`}{" "}
          {`(2 hours ago)`}
        </div>
        {story && (
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: "24px",
            }}
          >
            <button
              onClick={shouldPushComments}
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                opacity: 0.6,
                letterSpacing: -0.3,
                padding: "4px 12px",
                background: "rgba(0,0,0,0.03)",
                outline: "none",
                border: "1px solid lightgray",
              }}
            >
              {story?.descendants} comments
            </button>
            {/* <span
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                opacity: 0.6,
                letterSpacing: -0.3,
                paddingRight: "16px",
              }}
            >
              23 comments
            </span> */}
          </div>
        )}
      </div>

      {firstComment && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: firstComment }} />
        </div>
      )}
    </div>
  );
}
