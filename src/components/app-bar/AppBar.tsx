import React from "react";
import Style from "./AppBar.module.css";

import { styles } from "../../pages/utils";
import { ComponentBaseProps } from "../../types";

import { ReactComponent as AccountSVG } from "../../svg/account_circle-24px.svg";
import IconButton from "../icon-button/IconButton";
import { ActionType } from "../../enums/ActionType";
import { State } from "../../state";

export default function AppBar(props: ComponentBaseProps<State>) {
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
