import Style from "./Comments.module.css";
import Layout from "../components/Layout.module.css";
import useComments from "../effects/useComments";
import { useObserver } from "../effects/useObserver";
import { BaseProps, DBPath, Story } from "../types";

export type CommentsProps = BaseProps;

export default function Comments(props: CommentsProps) {
  const storyId = props.router.route?.params?.storyId;

  const snap = useObserver(storyId, DBPath.item);

  // console.log("sanp", snap);

  // const story: Story | undefined = snap?.val();
  // const children = story?.kids || [];
  const comments = useComments(snap?.val().kids || []);

  // console.log("story", snap?.val().kids);

  return (
    <div className={Layout.container}>
      <div>Comments</div>

      <div>
        {comments.map((comment, i) => (
          // TODO Replace with ReplyItem

          <div key={i}>{comment.by}</div>
        ))}
      </div>
    </div>
  );
}
