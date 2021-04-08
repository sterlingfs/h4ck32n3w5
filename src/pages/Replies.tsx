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
  const replies = Object.values(state.commentRecord)
    .filter((reply) => reply.id)
    .sort((a, b) => {
      return a.time < b.time ? 1 : -1;
    });

  const id = state.auth.user?.id;

  return (
    <div className={Layout.container}>
      <div className={Style.list}>
        {id &&
          replies.map((comment, i) => (
            <ReplyItem
              key={i}
              userId={id}
              comment={comment}
              parent={submissions[comment.parent]}
            />
          ))}
      </div>
    </div>
  );
}
