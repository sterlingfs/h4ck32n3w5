import React, { useState } from "react";
import Style from "./SignIn.module.css";

import Dialog from "../../components/dialog/Dialog";
import TextInput from "../../components/text-input/TextInput";
import { ComponentBaseProps } from "../../types";
import { ActionType } from "../../enums/ActionType";
import { State } from "../../state";

export type SignInProps = ComponentBaseProps<State>;

export default function SignIn(props: SignInProps) {
  const { store } = props;
  const user = store.state.auth.user;

  const [username, setUsername] = useState(store.state.auth.user?.id);

  const getUser = (uid: string) => {
    store.dispatch({
      type: ActionType.initWatchUid,
      payload: { uid },
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
                  label={"HN Username"}
                  onChange={(ev) => {
                    setUsername(ev.target.value);
                  }}
                  onKeyDown={(ev) =>
                    ev.key === "Enter" && username && getUser(username)
                  }
                  placeholder={""}
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
