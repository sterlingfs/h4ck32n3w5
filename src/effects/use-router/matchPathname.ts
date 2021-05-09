import React from "react";
import { RouteName } from "./RouteName";

export type LazyComp = typeof Stories | typeof Replies;

const Latest = React.lazy(() => import("../../pages/Latest"));
const Stories = React.lazy(() => import("../../pages/Stories"));
const Replies = React.lazy(() => import("../../pages/Replies"));
const Comments = React.lazy(() => import("../../pages/Comments"));

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
    case RouteName.comments:
      return Comments;
  }
};
