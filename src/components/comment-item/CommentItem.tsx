import React from "react";
import Style from "./CommentItem.module.css";

import Button from "../../components/button/Button";

import { CommentEntry, CommentFilter, HNComment } from "../../types";
import { useEffect } from "react";
import { Colors } from "../../enums/Color";

export type CommentItemProps = {
  comment: HNComment;
  kids: CommentEntry[];
  isOwner?: boolean;
  getFilter: (commentId: number) => CommentFilter;
  toggleCollapse: (storyId: number) => void;
};

enum ButtonTitle {
  collapse = "collapse",
  extend = "extend",
}

const colors = Object.keys(Colors).reverse();
const PATH = "https://news.ycombinator.com/user";

export default function CommentItem(props: CommentItemProps) {
  const { comment, kids, isOwner, getFilter, toggleCollapse } = props;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const depth = comment.depth ?? 0;
    if (childRef.current) {
      childRef.current.style.borderLeftColor = colors[depth] || colors[-1];
    }
  });

  const extended = getFilter(comment.id)?.collapsed !== true;
  const toggleTitle = extended ? ButtonTitle.collapse : ButtonTitle.extend;
  const rootClassName = `${Style.CommentItem} ${
    comment.dead ? Style.dead : ""
  }`;

  return (
    <div ref={rootRef} className={rootClassName}>
      <div className={Style.headerRow}>
        <div className={`${Style.username} ${isOwner ? Style.isOwner : ""}`}>
          {comment.dead && <span className={Style.deadEmoji}>💀</span>}
          <a href={`${PATH}?id=${comment.by}`}>{comment.by}</a>
        </div>

        <Button
          title={toggleTitle}
          onClick={() => props.toggleCollapse(comment.id)}
        />
      </div>

      {extended && (
        <div className={Style.content}>
          <div
            className={Style.htmlComment}
            dangerouslySetInnerHTML={{
              __html: comment.text,
            }}
          />

          {kids.length > 0 && (
            <div ref={childRef} className={Style.children}>
              {kids.map(([comment, kids], i) => (
                <CommentItem
                  key={i}
                  comment={comment}
                  kids={kids}
                  getFilter={getFilter}
                  toggleCollapse={toggleCollapse}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
