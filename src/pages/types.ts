import { Router } from "../effects/use-router/types";
import { Store } from "../effects/use-store/useStore";
import { ActionType } from "../enums/ActionType";
import { State } from "../state";
import { ComponentBaseProps } from "../types";

export type InjectedComponentBaseProps = ComponentBaseProps<
  Store<ActionType, State>,
  Router,
  {}
>;
