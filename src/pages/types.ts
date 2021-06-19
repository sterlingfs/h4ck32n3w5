import { Router } from "../effects/use-router/types";
import { Store } from "../effects/use-store/useStore";
import { ActionType } from "../enums/ActionType";
import { State } from "../state";
import { ComponentBaseProps as _ComponentBaseProps } from "../types";

export type ComponentBaseProps = _ComponentBaseProps<
  Store<ActionType, State>,
  Router,
  {}
>;
