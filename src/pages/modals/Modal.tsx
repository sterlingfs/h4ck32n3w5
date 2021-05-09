import React, { Suspense, useEffect, useState } from "react";
import Style from "./Modal.module.css";

import { ComponentBaseProps } from "../../types";
import { styles } from "../utils";
import { ActionType } from "../../enums/ActionType";
import { State } from "../../state";

export type ModalProps = ComponentBaseProps<State> & {};

// type LazyComponent =
//   | React.LazyExoticComponent<(props: BaseProps) => JSX.Element>
//   | undefined;

// type LazyComponentCache = {
//   [modalName: string]: LazyComponent;
// };

export default function Modal(props: ModalProps) {
  const { state, dispatch } = props.store;

  const [cache, setCache] = useState<any>({});

  // Comp fetch

  useEffect(() => {
    const getLazyComponent = (name: string) => {
      switch (name) {
        case "signin":
          return React.lazy(() => import("./SignIn"));
        default:
          return undefined;
      }
    };

    const name = state?.modal?.name;
    const isCached = name && cache[name];

    if (!isCached && name) {
      const comp = getLazyComponent(name);
      comp && setCache({ [name]: comp });
    }
  }, [state, cache, setCache]);

  const modal = state?.modal;
  const position = modal?.position ?? "closed";
  const RouterOutlet = modal?.name ? cache[modal?.name] : undefined;

  return (
    // <div className={styles(Style.Modal, Style.closed)}>
    <div className={styles(Style.Modal, Style[position])}>
      {RouterOutlet && (
        <Suspense fallback={<div>Loading...</div>}>
          <RouterOutlet {...props} />
        </Suspense>
      )}

      <div
        className={Style.scrim}
        onClick={() =>
          dispatch({
            type: ActionType.setModal,
            payload: { position: "closed" },
          })
        }
      ></div>
    </div>
  );
}
