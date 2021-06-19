import React from "react";
import { RouteName } from "./RouteName";

export type LazyComp = typeof Stories | typeof Replies;

const Latest = React.lazy(() => import("../../pages/Latest"));
const Stories = React.lazy(() => import("../../pages/TopStories"));
const Replies = React.lazy(() => import("../../pages/Replies"));
const Story = React.lazy(() => import("../../pages/Story"));

export const matchPathname = (routeName: RouteName): LazyComp => {
  switch (routeName) {
    case RouteName.root:
      return Stories;
    case RouteName.topStories:
      return Stories;
    case RouteName.lastest:
      return Latest;
    case RouteName.replies:
      return Replies;
    case RouteName.story:
      return Story;
    default:
      throw new Error("Switch fallthrough");
  }
};
