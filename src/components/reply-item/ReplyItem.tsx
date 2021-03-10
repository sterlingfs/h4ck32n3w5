import React from "react";
import Style from "./ReplyItem.module.css";
import { Comment } from "../../types";
import { dateString } from "../../pages/utils";

export type ReplyItemProps = { comment: Comment; isOwner?: boolean };

export default function ReplyItem(props: ReplyItemProps) {
  const { comment, isOwner } = props;

  return (
    <div className={Style.ReplyItem}>
      <div className={`${Style.username} ${isOwner && Style.isOwner}`}>
        <a href={`https://news.ycombinator.com/user?id=${comment.by}`}>
          {comment.by}
        </a>
      </div>
      <div>{dateString(comment.time)}</div>

      <div
        className={Style.htmlComment}
        dangerouslySetInnerHTML={{
          __html: comment.text,
        }}
      />
    </div>
  );
}
