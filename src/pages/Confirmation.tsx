import React from "react";

import Button from "../components/button/Button";
import Style from "./Confirmation.module.css";

export type ConfirmationProps = {};

export default function Confirmation(props: ConfirmationProps) {
  return (
    <div className={Style.Confirmation}>
      <Button title={"Back to safty"} onClick={() => {}} />
      <Button title={"Back to safty"} onClick={() => {}} />
    </div>
  );
}
