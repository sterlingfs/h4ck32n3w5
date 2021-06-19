export type DateStringOpts = {
  days: number;
  hours: number;
  minutes: number;
};

export function dateString({ days, hours, minutes }: DateStringOpts) {
  if (days) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    throw new Error("Case fallthrough");
  }
}
