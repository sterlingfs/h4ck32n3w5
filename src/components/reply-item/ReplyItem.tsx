import React from "react";
import Style from "./ReplyItem.module.css";
import { HNComment, HNStory } from "../../types";

export type ReplyItemProps = {
  userId: string;
  comment: HNComment;
  parent: HNStory | HNComment;
};

export default function ReplyItem(props: ReplyItemProps) {
  const { userId, comment, parent } = props;

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
        </div>

        <div
          className={Style.htmlComment}
          dangerouslySetInnerHTML={{
            __html: comment.text,
          }}
        />
      </div>

      <div className={Style.sourceContainer}>
        <div className={Style.sourceTitle}>
          <span>In reply to </span>
          <span className={Style.sourceTitleUser}>
            {parent.by === userId ? "me" : parent.by}
          </span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: parentTitle,
          }}
        ></div>
      </div>
    </div>
  );
}
