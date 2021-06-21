import { Route, RawRoute } from "../types";

export function getRoute(rawRoute: RawRoute): Route {
  const params =
    rawRoute.params ??
    rawRoute?.segments
      .filter(({ type }) => type === "variable")
      .reduce((map, stub) => ({ ...map, [stub.key]: stub.value }), {});

  return {
    ...rawRoute,
    params,
    redirect: rawRoute.redirect ?? null,
    hooks: {
      before: () => {},
      after: () => {},
      ...rawRoute.hooks,
    },
  };
}
