import React from "react";
import Style from "./CommentItem.module.css";
import { CommentEntry, HNComment } from "../../types";
import { useEffect } from "react";

export type CommentItemProps = {
  comment: HNComment;
  kids: CommentEntry[];
  isOwner?: boolean;
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
      // childRef.current.style.backgroundColor = color;
    }
  });

  return (
    <div ref={rootRef} className={Style.CommentItem}>
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
      </div>

      {kids.length > 0 && (
        <div ref={childRef} className={Style.children}>
          {kids.map(([comment, kids], i) => (
            <CommentItem key={i} comment={comment} kids={kids} />
          ))}
        </div>
      )}
    </div>
  );
}
