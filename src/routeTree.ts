import { RouteName } from "./effects/use-router/RouteName";

export const routeTree = [
  {
    name: RouteName.root,
    path: "/",
  },
  {
    name: RouteName.lastest,
    path: "/latest",
  },
  {
    name: RouteName.topStories,
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
