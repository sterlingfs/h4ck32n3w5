import React from "react";

import { HNStory } from "../../types";
import Style from "./StoryItem.module.css";

import { getTimeAgo } from "../../functions/getTimeAgo";
import { getURLforStory } from "../../functions/getURLforStory";

export type StoryItemProps = {
  rank: number | null;
  story: HNStory;
  shouldPushComments: () => void;
};

export default function StoryItem(props: StoryItemProps) {
  const { rank, story, shouldPushComments } = props;

  const timeAgo = story.time && getTimeAgo(story.time);
  const url = getURLforStory(story);

  return (
    <div className={Style.StoryItem} onClick={shouldPushComments}>
      <div className={Style.contentColumn}>
        <span className={Style.title}>{story?.title}</span>
        <div className={Style.titleHost}>{url.hostname}</div>

        <div className={Style.byLine}>
          {timeAgo} by {story?.by}
        </div>

        <div className={Style.bottomLineContainer}>
          <div className={Style.tag}>
            <span>👑</span>
            <span>{rank}</span>
          </div>
          <div className={Style.tag}>
            <span>👍</span>
            <span>{story?.score ?? 0}</span>
          </div>
          <div className={Style.tag}>
            <span>💬</span>
            <span>
              {story?.descendants ?? 0}:{story?.kids?.length ?? 0}
            </span>
          </div>
        </div>
      </div>

      {/* {firstComment && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: firstComment }} />
        </div>
      )} */}

      <div className={Style.contentColumn}>
        <a href={url.toString()} onClick={(e) => e.stopPropagation()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
