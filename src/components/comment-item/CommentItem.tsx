import React from "react";
import Style from "./CommentItem.module.css";
import { Comment } from "../../types";

export type CommentItemProps = { comment: Comment };

export default function CommentItem(props: CommentItemProps) {
  return <div className={Style.CommentItem}>{props.comment.text}</div>;
}
