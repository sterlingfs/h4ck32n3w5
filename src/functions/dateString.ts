export function dateString({
  days,
  hours,
  minutes,
}: {
  days: number;
  hours: number;
  minutes: number;
}) {
  if (days) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
}
