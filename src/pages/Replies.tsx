import Style from "./Replies.module.css";
import Layout from "../components/Layout.module.css";
import { InjectedComponentBaseProps } from "./types";

export type RepliesProps = InjectedComponentBaseProps;

export default function Replies(props: RepliesProps) {
  return (
    <div className={Layout.container}>
      <div className={Style.list}></div>
    </div>
  );
}
