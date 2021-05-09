import { useReducer } from "react";
import { ActionType } from "../../enums/ActionType";
import { Reducer } from "../../reducer";
import { State } from "../../state";
import { Action } from "../../types";

export function useStore(reducer: Reducer, initState: State) {
  // Store
  const [state, dispatch] = useReducer(
    (state: State, action: Action<ActionType>) => {
      const newState = reducer(state, action);
      // const mutationHistory = [
      //   ...state.mutationHistory.slice(0, 50),
      //   { action, state: newState },
      // ];
      return { ...newState };
    },
    initState
  );

  return { state, dispatch };
}
