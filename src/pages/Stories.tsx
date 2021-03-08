import React from "react";
import Style from "./Stories.module.css";
import Layout from "../components/Layout.module.css";

import { BaseProps, Story } from "../types";
import { useTopStoriesOrderedList } from "../effects/useTopStoriesOrderedList";

export type StoriesProps = BaseProps;

export default function Stories(_props: StoriesProps) {
  const listItems = useTopStoriesOrderedList();

  return <div className={Layout.container}>{listItems.map(ListItem)}</div>;
}

function ListItem(s: Story, i: number) {
  const pdate = (t: number) => new Date(t * 1000).toLocaleString();

  return (
    <div key={i} className={Style.item}>
      <a href={s.url}>{s.title}</a>
      <div>{pdate(s.time)}</div>
      <div>
        <span>SCORE: {s.score}</span> | <span>KIDS: {s.kids?.length}</span> |{" "}
        <span>DESC: {s.descendants}</span>
      </div>
    </div>
  );
}
