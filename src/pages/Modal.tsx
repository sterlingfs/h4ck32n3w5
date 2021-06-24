import React, { Suspense, useEffect, useState } from "react";
import Style from "./Modal.module.css";

import { InjectedComponentBaseProps } from "./types";
import { ActionType } from "../enums/ActionType";
import { ModalName } from "../enums/ModalName";
import { ModalPosition } from "../enums/ModalPosition";
import { Payload } from "../mutations";

export type ModalProps = InjectedComponentBaseProps;

export default function Modal(props: ModalProps) {
  const { state, dispatch } = props.store;
  const [ContentView, setContentView] =
    useState<React.LazyExoticComponent<any> | undefined>();

  const modalState = state.app.modal;
  const position = modalState.position;

  useEffect(() => {
    const getLazyComponent = (name: ModalName) => {
      switch (name) {
        case ModalName.signin:
          return React.lazy(() => import("./SignIn"));
        case ModalName.confirmation:
          return React.lazy(() => import("./Confirmation"));
        case ModalName.unset: {
          return undefined;
        }
        default:
          throw new Error("Case fallthrough. Component not found");
      }
    };

    const comp = getLazyComponent(modalState.name);
    setContentView(comp);
  }, [modalState]);

  const closeModalCallback = () => {
    const payload: Payload<ActionType.setModal> = {
      name: ModalName.unset,
      position: ModalPosition.closed,
    };
    dispatch({ type: ActionType.setModal, payload });
  };

  const RouterOutlet = ContentView;

  return (
    <div className={[Style.Modal, Style[position]].join(" ")}>
      <div className={Style.scrim} onClick={closeModalCallback}></div>

      {RouterOutlet && (
        <Suspense fallback={<div></div>}>
          {RouterOutlet && <RouterOutlet {...props} />}
        </Suspense>
      )}
    </div>
  );
}
