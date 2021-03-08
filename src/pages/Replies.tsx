import React from "react";
import Style from "./Replies.module.css";
import Layout from "../components/Layout.module.css";

import { useComments } from "../effects/useComments";
import { BaseProps } from "../types";

export type RepliesProps = BaseProps;

export default function Replies(props: RepliesProps) {
  const { store } = props;
  const { state } = store;

  const username = state?.user?.id ?? "";
  const listItems = useComments(username);

  function dateString(t: number) {
    return new Date(t * 1000).toLocaleString();
  }

  return (
    <div className={Layout.container}>
      <div className={Style.list}>
        {listItems.map(([k, v]) => {
          return (
            <div key={k} className={Style.item}>
              <div
                className={`${Style.username} ${
                  v.by === username && Style.isOwner
                }`}
              >
                <a href={`https://news.ycombinator.com/user?id=${v.by}`}>
                  {v.by}
                </a>
              </div>
              <div>{dateString(v.time)}</div>

              <div
                className={Style.htmlComment}
                dangerouslySetInnerHTML={{
                  __html: v.text,
                }}
              />

              <div>DISC conversation qty</div>
              <div>open comment in hn</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
