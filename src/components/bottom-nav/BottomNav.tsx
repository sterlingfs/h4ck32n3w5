import React from "react";
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
        <Button title={"top stories"} onClick={() => setRoute("/stories")} />
        <Button title={"replies"} onClick={() => setRoute("/replies")} />
      </div>
    </div>
  );
}
