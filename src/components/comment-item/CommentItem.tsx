import React from "react";
import Style from "./CommentItem.module.css";
import { HNComment } from "../../types";

export type CommentItemProps = { comment: HNComment; isOwner?: boolean };

export default function CommentItem(props: CommentItemProps) {
  const { comment, isOwner } = props;
  return (
    <div className={Style.CommentItem}>
      <div className={`${Style.username} ${isOwner && Style.isOwner}`}>
        <a href={`https://news.ycombinator.com/user?id=${comment.by}`}>
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
  );
}
