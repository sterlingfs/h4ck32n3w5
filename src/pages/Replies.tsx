import React from "react";
import Style from "./Replies.module.css";
import Layout from "../components/Layout.module.css";

import CommentItem from "../components/comment-item/CommentItem";
import { useUserReplies } from "../effects/useUserReplies";
import { BaseProps } from "../types";

export type RepliesProps = BaseProps;

export default function Replies(props: RepliesProps) {
  const { store } = props;
  const { state } = store;

  const user = state?.user;
  const userReplies = useUserReplies(user);

  // TODO Descendants qty
  // TODO link open comment in hn

  return (
    <div className={Layout.container}>
      <div>Replies</div>
      <div className={Style.list}>
        {userReplies.map((comment, i) => (
          <CommentItem key={i} comment={comment} />
        ))}
      </div>
    </div>
  );
}
