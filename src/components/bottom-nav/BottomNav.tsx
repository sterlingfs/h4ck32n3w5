import React from "react";

import { RouteName } from "../../effects/use-router/types";
import Button from "../button/Button";
import Style from "./BottomNav.module.css";

export type BottomBarProps = {
  setRoute: (route: any) => void;
};

export default function BottomBar(props: BottomBarProps) {
  const { setRoute } = props;

  return (
    <div className={Style.BottomNav}>
      <div className={Style.container}>
        <Button
          title={"top stories"}
          onClick={() => {
            setRoute({ name: RouteName.topStories });
          }}
        />
        <Button
          title={"latest news"}
          onClick={() => setRoute({ name: RouteName.lastest })}
        />
        <Button
          title={"replies"}
          onClick={() => setRoute({ name: RouteName.replies })}
        />
      </div>
    </div>
  );
}
