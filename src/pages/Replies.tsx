import Style from "./Replies.module.css";
import Layout from "../components/Layout.module.css";

import "firebase/database";

import { BaseProps } from "../types";
import { useEffect } from "react";
import { ActionType } from "../enums/ActionType";
import { Action } from "../effects/store/useStore";

export type RepliesProps = BaseProps;

export default function Replies(props: RepliesProps) {
  const { store } = props;
  const { state, dispatch } = store;

  // TODO Page breaks if no user
  // TODO Descendants qty
  // TODO link open comment in hn

  // const comments = useComments(user?.submitted || [], () => dispatch());
  // const replies = useCommentReplies(comments);

  // const stream = [...comments, ...replies].sort((a, b) =>
  //   a.time > b.time ? -1 : 1
  // );

  useEffect(() => {
    dispatch({ type: ActionType.didMount });
  }, [dispatch]);

  return (
    <div className={Layout.container}>
      <div>Replies</div>
      <div className={Style.list}>
        {/* {stream.map((comment, i) => (
          <ReplyItem key={i} comment={comment} />
        ))} */}
      </div>
    </div>
  );
}
