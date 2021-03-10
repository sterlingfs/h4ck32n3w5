import React from "react";
import Style from "./AppBar.module.css";

import { styles } from "../../pages/utils";
import { BaseProps, ActionType } from "../../types";

import { ReactComponent as AccountSVG } from "../../svg/account_circle-24px.svg";
import IconButton from "../icon-button/IconButton";

export type AppBarProps = Pick<BaseProps, "store">;

export default function AppBar(props: AppBarProps) {
  const { store } = props;
  const { dispatch } = store;

  return (
    <div className={Style.AppBar}>
      <div className={Style.section}>
        <div className={Style.title}>h4ck32n3w5.app</div>
      </div>

      <div className={styles(Style.section, Style.right)}>
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
