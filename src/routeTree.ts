import { RouteName } from "./effects/use-router/types";
import { RouteConfig } from "./effects/use-router/types";

export const routeTree: RouteConfig[] = [
  {
    name: RouteName.root,
    path: "/",
    redirect: RouteName.topStories,
  },
  {
    name: RouteName.lastest,
    path: `/${RouteName.lastest}`,
  },
  {
    name: RouteName.topStories,
    path: `/${RouteName.topStories}`,
  },
  {
    name: RouteName.story,
    path: `/${RouteName.story}/:storyId`,
  },
  {
    name: RouteName.replies,
    path: `/${RouteName.replies}`,
  },
];
