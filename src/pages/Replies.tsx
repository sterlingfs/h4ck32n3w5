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

  const submissions = state.submissionRecord;

  // TODO #5 Cache to store
  const replies = Object.values(state.replyRecord).sort((a, b) => {
    return a.time < b.time ? 1 : -1;
  });

  return (
    <div className={Layout.container}>
      <div className={Style.list}>
        {state.user?.id &&
          replies.map((comment, i) => (
            <ReplyItem
              key={i}
              userId={state.user!.id}
              comment={comment as any}
              parent={submissions[comment.parent]}
            />
          ))}
      </div>
    </div>
  );
}
