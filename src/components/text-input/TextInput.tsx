import React from "react";
import Style from "./TextInput.module.css";

export type TextInputProps = {
  type: string;
  label?: string;
  placeholder?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function TextInput(props: TextInputProps) {
  const { label, ...rest } = props;
  return (
    <div className={Style.TextInput}>
      {label && <label>{label}</label>}
      <input className={Style.input} {...rest} />
    </div>
  );
}
