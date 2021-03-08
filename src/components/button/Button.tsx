import React from "react";
import Style from "./Button.module.css";

export type ButtonProps = { title: string; onClick: () => void };

export default function Button(props: ButtonProps) {
  const { title, onClick } = props;

  return (
    <button className={Style.Button} onClick={onClick}>
      {title}
    </button>
  );
}
