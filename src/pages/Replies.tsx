import Style from "./Replies.module.css";
import Layout from "../components/Layout.module.css";
import { ComponentBaseProps } from "./types";

export type RepliesProps = ComponentBaseProps;

export default function Replies(props: RepliesProps) {
  return (
    <div className={Layout.container}>
      <div className={Style.list}></div>
    </div>
  );
}
