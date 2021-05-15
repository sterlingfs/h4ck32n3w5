import React from "react";

import { ReactComponent as ThumbUp } from "../../svg/thumb-up.svg";
import { ReactComponent as Comment } from "../../svg/comment.svg";
import { ReactComponent as Launch } from "../../svg/launch.svg";

import { HNStory } from "../../types";
import Style from "./StoryItem.module.css";

export type StoryItemProps = {
  id?: number;
  index: number;
  story?: HNStory;
  timeAgo?: string;
  shouldPushComments: () => void;
};

export default function StoryItem(props: StoryItemProps) {
  const { index, story, timeAgo } = props;

  const firstComment = story?.firstComment?.text || "";
  const url = story?.url && new URL(story?.url);
  const host = url ? url.hostname : "";

  return (
    <div className={Style.StoryItem}>
      <div className={Style.topLineContainer}>
        <div>{index}</div>
      </div>
      <div>
        <div>
          <div className={Style.title}>{story?.title}</div>
          <a className={Style.titleLink} href={story?.url || "/"}>
            <span className={Style.titleHost}> {host}</span>
            <Launch style={{ height: "14px" }} />
          </a>
        </div>

        <span className={Style.byLine}>
          {timeAgo} by {story?.by}
        </span>

        <div className={Style.bottomLineContainer}>
          <div className={Style.tag}>
            <ThumbUp className={Style.tagIcon} />
            <span>{story?.score ?? 0}</span>
          </div>
          <div className={Style.tag}>
            <Comment className={Style.tagIcon} />
            <span>
              {story?.descendants ?? 0}/{story?.kids?.length ?? 0}
            </span>
          </div>
        </div>

        {story && (
          <div>
            {/* <button
              className={Style.commentButton}
              onClick={shouldPushComments}
            >
              {story?.descendants} comments
            </button> */}

            {/* <button
              className={Style.commentButton}
              onClick={shouldPushComments}
            >
              {story?.score} points
            </button> */}
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
