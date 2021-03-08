import React, { useState } from "react";
import Style from "./SignIn.module.css";

import Dialog from "../../components/dialog/Dialog";
import TextInput from "../../components/text-input/TextInput";
import { ActionType, BaseProps } from "../../types";
import { useWatchUser } from "../../effects/useWatchUser";

export type SignInProps = BaseProps;

export default function SignIn(props: SignInProps) {
  const { store } = props;

  const [username, setUsername] = useState(store.state.user?.id ?? "");
  const user = useWatchUser(username);

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
                  onKeyDown={(ev) =>
                    ev.key === "Enter" &&
                    store.dispatch({
                      type: ActionType.user,
                      payload: { id: username },
                    })
                  }
                  placeholder={"hN username"}
                />
              </section>

              <section>
                <div>USER PROFILE</div>
                <div>
                  <div>{user?.val()?.id}</div>
                  <div>{user?.val()?.karma}</div>
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
