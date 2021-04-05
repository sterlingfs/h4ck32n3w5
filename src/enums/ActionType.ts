export enum ActionType {
  initApp = "initApp",
  setState = "setState",

  didMount = "didMount",
  setModal = "setModal",

  watchUid = "watchUid",
  awaitingUser = "awaitingUser",
  emitUser = "emitUser",
  releaseUid = "releaseUid",

  emitStory = "emitStory",
  emitTopStory = "emitTopStory",
  emitNewStory = "emitNewStory",
  emitTopStoryIds = "emitTopStoryIds",
  emitNewStoryIds = "emitNewStoryIds",

  emitReply = "emitReply",
  emitSubmission = "emitSubmission",
}
