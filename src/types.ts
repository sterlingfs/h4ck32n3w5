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
  dead?: boolean;
  depth?: number;
  firstComment: HNComment;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
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

export type CommentFilter = { showDead?: boolean; collapsed?: boolean };
export type CommentId = string;
export type CommentFilterRecord = Record<CommentId, CommentFilter>;
