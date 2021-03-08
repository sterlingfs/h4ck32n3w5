import { useObserver } from "./useObserver";

export const useWatchItem = (id: string) => useObserver(id);
