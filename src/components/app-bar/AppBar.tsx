import React from "react";
import Style from "./AppBar.module.css";

import { ReactComponent as AccountSVG } from "../../svg/account_circle-24px.svg";
import IconButton from "../icon-button/IconButton";
import { ActionType } from "../../enums/ActionType";
import { ComponentBaseProps } from "../../pages/types";

export default function AppBar(props: ComponentBaseProps) {
  const { store } = props;
  const { dispatch } = store;

  return (
    <div className={Style.AppBar}>
      <div className={Style.section}>
        <div className={Style.title}>h4ck32n3w5.app</div>
      </div>

      <div className={Style.section}>
        <IconButton
          icon={AccountSVG}
          onClick={() => {
            dispatch({
              type: ActionType.setModal,
              payload: {
                position: "open",
                name: "signin",
              },
            });
          }}
        />
      </div>
    </div>
  );
}
