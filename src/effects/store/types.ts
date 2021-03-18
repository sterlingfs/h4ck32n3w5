export type Store<State, Keys extends string> = {
  state: State;
  dispatch: (action: Action<Keys>) => void;
};

export type Action<Keys extends string> = {
  type: Keys;
  payload?: any;
};

export type ActionOptions<State, Keys extends string> = {
  state: State;
  commit: React.Dispatch<Action<Keys>>;
  dispatch: React.Dispatch<Action<Keys>>;
};

export type ActionFunction<State, Keys extends string> = (
  options: ActionOptions<State, Keys>,
  payload: any
) => Promise<any>;

export type MutationFunction<State> = (state: State, payload: any) => State;
