import React from "react";

import {
  getTimePassedString,
  howLongAgo,
} from "../../functions/getTimePassedString";

import { ReactComponent as ThumbUp } from "../../svg/thumb-up.svg";
import { ReactComponent as Comment } from "../../svg/comment.svg";
import { ReactComponent as Launch } from "../../svg/launch.svg";

import { HNStory } from "../../types";
import Style from "./StoryItem.module.css";

export type StoryItemProps = {
  id?: number;
  index: number;
  story?: HNStory;
  shouldPushComments: () => void;
};

export default function StoryItem(props: StoryItemProps) {
  const { index, story } = props;

  const firstComment = story?.firstComment?.text || "";
  const url = story?.url && new URL(story?.url);
  const host = url ? url.hostname : "";

  function getPointsPerComment(points: number, comments: number) {
    if (comments > 0) {
      return Math.round((points / comments) * 100) / 100;
    }
  }

  const ratio =
    story?.score &&
    story?.descendants &&
    getPointsPerComment(story.score, story.descendants);

  const timeAgo = howLongAgo(story!.time ?? Date.now() / 1000);

  const dateString = ({
    days,
    hours,
    minutes,
  }: ReturnType<typeof howLongAgo>) => {
    if (days) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

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
          {dateString(timeAgo)} by {story?.by}
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
