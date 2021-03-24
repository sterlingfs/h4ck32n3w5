import React, { useState } from "react";
import Style from "./SignIn.module.css";

import { getItem } from "../../firebase";

import Dialog from "../../components/dialog/Dialog";
import TextInput from "../../components/text-input/TextInput";
import { ComponentBaseProps } from "../../types";
import { ActionType } from "../../enums/ActionType";
import { DBPath } from "../../firebase/enums/DBPath";
import { State } from "../../state";

export type SignInProps = ComponentBaseProps<State>;

export default function SignIn(props: SignInProps) {
  const { store } = props;
  const user = store.state.user;

  const [username, setUsername] = useState(store.state.user?.id ?? "");

  const getUser = async (id: string) => {
    const userSnap = await getItem(id, DBPath.user);
    store.dispatch({
      type: ActionType.getUser,
      payload: userSnap.val(),
    });
  };

  return (
    <div className={Style.SignIn}>
      {/* <Menu /> */}
      <Dialog
        container={
          <div className={Style.container}>
            {/* <div className={Style.header}>516n-1n</div> */}
            <div className={Style.content}>
              <section>
                <TextInput
                  type={"text"}
                  label={"u53rn4m3"}
                  onChange={(ev) => {
                    setUsername(ev.target.value);
                  }}
                  onKeyDown={(ev) => ev.key === "Enter" && getUser(username)}
                  placeholder={"hn username"}
                />
              </section>

              <section>
                <div>USER PROFILE</div>
                <div>
                  <div>{user?.id}</div>
                  <div>{user?.karma}</div>
                </div>
              </section>

              {/* <section>USER SETTINGS</section> */}
            </div>
          </div>
        }
      />
    </div>
  );
}
