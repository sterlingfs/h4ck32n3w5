import React from "react";
import Style from "./CommentItem.module.css";

import Button from "../../components/button/Button";

import { CommentEntry, HNComment } from "../../types";
import { useEffect } from "react";

export type CommentItemProps = {
  comment: HNComment;
  kids: CommentEntry[];
  isOwner?: boolean;
  shouldShowDead: () => void;
};

const colors = [
  "#3E008E",
  "#00888C",
  "#3D8800",
  "#830906",
  "#4B137D",
  "#962B5D",
  "#AD7C45",
  "#8FC166",
  "#88D3AC",
  "#AAC0E2",
  "#DCCCF0",
].reverse();

export default function CommentItem(props: CommentItemProps) {
  const { comment, kids, isOwner } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const depth = comment.depth ?? 0;
    if (childRef.current) {
      childRef.current.style.borderLeftColor = colors[depth] || colors[-1];
    }
  });

  // TODO lift subview component
  const DefaultContent = () => (
    <div className={Style.comment}>
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

      <div ref={childRef} className={Style.children}>
        {kids.length > 0 &&
          kids.map(([comment, kids], i) => (
            <CommentItem
              key={i}
              comment={comment}
              kids={kids}
              shouldShowDead={props.shouldShowDead}
            />
          ))}
      </div>
    </div>
  );

  const DeadComment = () => (
    <div className={Style.comment}>
      <div className={`${Style.username} ${isOwner && Style.isOwner}`}>
        <span className={Style.deadEmoji}>💀</span>
        <a href={`https://news.ycombinator.com/user?id=${comment.by}`}>
          {comment.by}
        </a>
        <Button title={"View dead comment"} onClick={props.shouldShowDead} />
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className={Style.CommentItem}>
      {comment.dead ? <DeadComment /> : <DefaultContent />}
    </div>
  );
}
