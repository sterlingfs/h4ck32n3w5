import React from "react";

import { getTimePassedString } from "../../functions/getTimePassedString";

import { ReactComponent as Grade } from "../../svg/grade.svg";
import { ReactComponent as Comment } from "../../svg/comment.svg";
import { ReactComponent as Insight } from "../../svg/insight.svg";

import { HNStory } from "../../types";
import Style from "./StoryItem.module.css";

export type StoryItemProps = {
  id?: number;
  index: number;
  story?: HNStory;
  shouldPushComments: () => void;
};

export default function StoryItem(props: StoryItemProps) {
  const { index, story, shouldPushComments } = props;

  // if (!story?.score || !story.descendants) throw new Error("No story");

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

  return (
    <div className={Style.StoryItem}>
      <div className={Style.topLineContainer}>
        <div>{index}</div>
        {/* <div>{ratio} PPC</div> */}
      </div>
      <div>
        <div>
          <a className={Style.titleLink} href={story?.url || "/"}>
            <span className={Style.title}>{story?.title}</span>
            <span className={Style.titleHost}> {host}</span>
          </a>
        </div>

        {/* <div>{host && `${host}`}</div> */}

        {/* <div>
          {story?.time &&
            new Date(story?.time * 1000).toLocaleDateString("en-us", {
              month: "long" as "long",
              day: "numeric" as "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
        </div> */}

        <span className={Style.byLine}>
          <span>{getTimePassedString(story!.time)} </span>
          <span>by </span>
          <span>{story?.by} </span>
        </span>

        <div className={Style.bottomLineContainer}>
          <div className={Style.tag}>
            <Grade /> {story?.score ?? 0}
          </div>
          <div className={Style.tag}>
            <Comment /> {story?.descendants ?? 0}
          </div>

          <div className={Style.ratio}>{ratio} PPC</div>
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
