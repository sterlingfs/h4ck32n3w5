import { dateString } from "./dateString";

export function getTimeAgo(seconds: number) {
  const now = Date.now() / 1000;
  const then = seconds;

  const difSecs = now - then;
  const minSecs = 60;
  const hourSecs = 60 * minSecs;
  const daySecs = 24 * hourSecs;

  const data = {
    days: Math.floor(difSecs / daySecs),
    hours: Math.floor(difSecs / hourSecs) % 24,
    minutes: Math.floor(difSecs / minSecs) % 60,
  };

  return dateString(data);
}
