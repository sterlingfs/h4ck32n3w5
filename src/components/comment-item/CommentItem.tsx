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

  const filter = getFilter(comment.id);
  const zombie = comment.dead === true && filter?.showDead === true;
  const extended =
    filter?.collapsed === false || filter?.collapsed === undefined || zombie;

  const toggleTitle = extended ? ButtonTitle.collapse : ButtonTitle.extend;

  return (
    <div ref={rootRef} className={`${Style.Comment}`}>
      <div className={Style.headerRow}>
        <div className={`${Style.username} ${isOwner && Style.isOwner}`}>
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

          <div ref={childRef} className={Style.children}>
            {kids.length > 0 &&
              kids.map(([comment, kids], i) => (
                <CommentItem
                  key={i}
                  comment={comment}
                  kids={kids}
                  getFilter={getFilter}
                  toggleCollapse={toggleCollapse}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
