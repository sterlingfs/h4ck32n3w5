import Style from "./Replies.module.css";
import Layout from "../components/Layout.module.css";

import "firebase/database";

import { State } from "../state";
import { ComponentBaseProps, HNComment } from "../types";

import ReplyItem from "../components/reply-item/ReplyItem";

export type RepliesProps = ComponentBaseProps<State>;

export default function Replies(props: RepliesProps) {
  const { store } = props;
  const { state, dispatch } = store;

  // TODO What to download on init??

  // TODO Descendants qty
  // TODO link open comment in hn

  const submissions = state.submissionRecord;

  const replies = Object.values(state.replyRecord).sort((a, b) => {
    return a.time < b.time ? 1 : -1;
  });

  return (
    <div className={Layout.container}>
      <div>Replies</div>

      <p>What was replied to??</p>

      <div className={Style.list}>
        {replies.map((comment, i) => (
          <ReplyItem
            key={i}
            comment={comment as any}
            parent={submissions[comment.parent]}
          />
        ))}
      </div>
    </div>
  );
}
