export enum ActionType {
  initApp = "initApp",
  setState = "setState",

  didMount = "didMount",
  setModal = "setModal",

  watchUid = "watchUid",
  awaitingUser = "awaitingUser",
  emitUser = "emitUser",
  releaseUid = "releaseUid",

  emitTopStoryIds = "emitTopStoryIds",
  emitNewStoryIds = "emitNewStoryIds",

  emitTopStory = "emitTopStory",
  emitNewStory = "emitNewStory",

  emitReply = "emitReply",
  emitSubmission = "emitSubmission",
}
