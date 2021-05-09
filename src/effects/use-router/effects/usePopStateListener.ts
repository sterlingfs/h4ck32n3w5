import { useEffect } from "react";
import { ActionType, Dispatch } from "../types";

export function usePopStateListener(dispatch: Dispatch) {
  useEffect(() => {
    window.addEventListener("popstate", (event) => {
      dispatch({
        type: ActionType.pushPathname,
        payload: JSON.parse(window.history.state),
      });
    });
  }, [dispatch]);
}
