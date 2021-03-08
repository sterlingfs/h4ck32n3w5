import React from "react";
import Style from "./IconButton.module.css";

export type IconButtonProps = {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

export default function IconButton(props: IconButtonProps) {
  const { icon: Icon, ...rest } = props;

  return (
    <button className={Style.IconButton} {...rest}>
      <Icon />
    </button>
  );
}
