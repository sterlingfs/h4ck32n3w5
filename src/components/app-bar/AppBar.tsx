import React from "react";
import Style from "./AppBar.module.css";

import { ReactComponent as AccountSVG } from "../../svg/account_circle-24px.svg";
import IconButton from "../icon-button/IconButton";
import { ActionType } from "../../enums/ActionType";
import { InjectedComponentBaseProps } from "../../pages/types";

export default function AppBar(props: InjectedComponentBaseProps) {
  const { store } = props;
  const { dispatch } = store;

  return (
    <div className={Style.AppBar}>
      <div className={Style.section}></div>

      <div className={Style.section}>
        {/* <IconButton
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
        /> */}
      </div>
    </div>
  );
}
