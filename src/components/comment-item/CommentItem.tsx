import React from "react";
import Style from "./CommentItem.module.css";
import { CommentEntry, HNComment } from "../../types";
import { useEffect } from "react";

export type CommentItemProps = {
  comment: HNComment;
  kids: CommentEntry[];
  isOwner?: boolean;
};

export default function CommentItem(props: CommentItemProps) {
  const { comment, kids, isOwner } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const depth = comment.depth ?? 0;
    if (childRef.current) {
      const factor = 256 - 4 * depth - depth;
      const color = `rgb(${factor},${factor},${factor * 1.02})`;
      childRef.current.style.borderLeftColor = color;
      childRef.current.style.borderLeft = "1px solid";
      // childRef.current.style.backgroundColor = color;
    }

    if (rootRef.current && depth === 0) {
      rootRef.current.style.paddingRight = "16px";
    }
  });

  return (
    <div ref={rootRef} className={Style.CommentItem}>
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

      {kids.length > 0 && (
        <div ref={childRef} className={Style.comments}>
          {kids.map(([comment, kids], i) => (
            <CommentItem key={i} comment={comment} kids={kids} />
          ))}
        </div>
      )}
    </div>
  );
}
