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

  console.log("tupeof", typeof parent);

  return (
    <div className={Style.ReplyItem}>
      <div>@{parentTitle}</div>

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
