export type ComponentBaseProps<Store, Router, Database> = {
  store: Store;
  router: Router;
  database: Database;
};

export type HNStory = {
  by: string;
  descendants: number;
  firstComment: HNComment;
  id: number;
  index: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
};

export type HNComment = {
  by: string;
  firstComment: HNComment;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
  depth?: number;
};

export type HNUser = {
  about: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
};

export type StateMutation<State, Action> = {
  action: Action;
  state: State;
};

export type CommentEntry = [HNComment, CommentEntry[] | []];
