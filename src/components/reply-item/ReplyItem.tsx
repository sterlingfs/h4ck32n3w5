import React from "react";
import Style from "./ReplyItem.module.css";
import { HNComment, HNStory } from "../../types";
import { dateString } from "../../pages/utils";

export type ReplyItemProps = {
  comment: HNComment;
  parent: HNStory | HNComment;
  isOwner?: boolean;
};

export default function ReplyItem(props: ReplyItemProps) {
  const { comment, parent, isOwner } = props;

  const parentTitle = parent.type === "comment" ? parent.text : parent.title;

  return (
    <div className={Style.ReplyItem}>
      <div className={Style.replyContainer}>
        <div className={`${Style.usernameContainer}`}>
          <a
            className={`${Style.username}`}
            href={`https://news.ycombinator.com/user?id=${comment.by}`}
          >
            {comment.by}
          </a>
          <span> on {dateString(comment.time)}</span>
        </div>

        <div
          className={Style.htmlComment}
          dangerouslySetInnerHTML={{
            __html: comment.text,
          }}
        />
      </div>

      <div className={Style.sourceContainer}>
        <div>In reply to</div>
        <div
          dangerouslySetInnerHTML={{
            __html: parentTitle,
          }}
        ></div>
      </div>
    </div>
  );
}
