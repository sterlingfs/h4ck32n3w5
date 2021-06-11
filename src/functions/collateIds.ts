type ItemId = number;
type Quantity = number;

export type ModRecord = Record<ItemId, Quantity>;

export function collateIds(itemIds: number[], record: ModRecord): ModRecord {
  if (itemIds.length > 0) {
    const nextStoryId = itemIds[0];
    const lastIndexOfNextStory = itemIds.lastIndexOf(nextStoryId);
    const newRecord = {
      ...record,
      [nextStoryId]: lastIndexOfNextStory + 1,
    };
    const newStoryIds = itemIds.slice(lastIndexOfNextStory + 1) ?? [];
    return collateIds(newStoryIds, newRecord);
  } else {
    return record;
  }
}
