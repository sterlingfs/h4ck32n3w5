import React, { useEffect, useState } from "react";
import Style from "./Replies.module.css";
import Layout from "../components/Layout.module.css";

import firebase from "firebase/app";
import "firebase/database";

import ReplyItem from "../components/reply-item/ReplyItem";
import { BaseProps, Comment } from "../types";
import useComments from "../effects/useComments";
import useCommentReplies from "../effects/useCommentReplies";

export type RepliesProps = BaseProps;

export default function Replies(props: RepliesProps) {
  const { store } = props;
  const { state } = store;

  const user = state?.user;

  const comments = useComments(user?.submitted || []);
  const replies = useCommentReplies(comments);

  const stream = [...comments, ...replies].sort((a, b) =>
    a.time > b.time ? -1 : 1
  );
  // TODO Descendants qty
  // TODO link open comment in hn

  return (
    <div className={Layout.container}>
      <div>Replies</div>
      <div className={Style.list}>
        {stream.map((comment, i) => (
          <ReplyItem key={i} comment={comment} />
        ))}
      </div>
    </div>
  );
}
