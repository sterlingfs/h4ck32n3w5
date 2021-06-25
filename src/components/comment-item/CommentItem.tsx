import React from "react";
import Style from "./CommentItem.module.css";

import Button from "../../components/button/Button";

import { CommentEntry, Filter, HNComment } from "../../types";
import { useEffect } from "react";

export type CommentItemProps = {
  comment: HNComment;
  kids: CommentEntry[];
  isOwner?: boolean;
  filter?: Filter;

  // TODO update this callback to handle toggle show/hide
  shouldShowDead: () => void;
};

export default function CommentItem(props: CommentItemProps) {
  const { comment, kids, isOwner, filter } = props;

  const rootRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const depth = comment.depth ?? 0;
    if (childRef.current) {
      childRef.current.style.borderLeftColor = colors[depth] || colors[-1];
    }
  });

  const shouldShowDead = comment.dead === true && filter?.showDead === true;
  const shouldHideDead = comment.dead === true && filter?.showDead !== true;
  const collapsed = filter?.collapse === true;

  const viewToggleTitle = () => {
    if (shouldHideDead) {
      return "expand";
    } else if (collapsed) {
      return "expand";
    } else {
      return "collapse";
    }
  };

  // console.log("filter", filter);
  // console.log("collapse", collapse);

  // console.log("hide dead", showDead);
  // console.log("show dead", hideDead);

  return (
    <div ref={rootRef} className={`${Style.Comment}`}>
      <div className={Style.headerRow}>
        <div className={`${Style.username} ${isOwner && Style.isOwner}`}>
          {comment.dead && <span className={Style.deadEmoji}>💀</span>}
          <a href={`https://news.ycombinator.com/user?id=${comment.by}`}>
            {comment.by}
          </a>
        </div>

        <Button title={viewToggleTitle()} onClick={props.shouldShowDead} />
      </div>

      {collapsed === false && shouldHideDead !== true && (
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
                  filter={filter}
                  shouldShowDead={props.shouldShowDead}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
