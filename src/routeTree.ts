import { RouteName } from "./effects/use-router/RouteName";

export const routeTree = [
  {
    name: RouteName.root,
    path: "/",
  },
  {
    name: RouteName.stories,
    path: "/stories",
  },
  {
    name: RouteName.stories,
    path: "/stories",
  },
  {
    name: RouteName.comments,
    path: "/comments/:storyId",
  },
  {
    name: RouteName.replies,
    path: "/replies",
  },
];
