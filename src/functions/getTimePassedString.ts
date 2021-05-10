type FormatOptions = Parameters<Date["toLocaleDateString"]>[1];
const formatOptions: FormatOptions = {
  month: "long" as "long",
  day: "numeric" as "numeric",
  year: "numeric",
};

export function howLongAgo(seconds: number) {
  const now = Date.now() / 1000;
  const then = seconds;

  const difSecs = now - then;
  const minSecs = 60;
  const hourSecs = 60 * minSecs;
  const daySecs = 24 * hourSecs;

  return {
    days: Math.floor(difSecs / daySecs),
    hours: Math.floor(difSecs / hourSecs) % 24,
    minutes: Math.floor(difSecs / minSecs) % 60,
  };
}

export function getTimePassedString(seconds: number) {
  if (seconds) {
    const MINUTE = 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = DAY * 360;

    const now = Date.now() / 1000;
    const timeDiff = now - seconds;

    if (timeDiff < HOUR) {
      const minutes = Math.floor(timeDiff / MINUTE);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDiff < DAY * 2) {
      const hours = Math.floor(timeDiff / HOUR);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (timeDiff < DAY * 7) {
      const days = Math.floor(timeDiff / DAY);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (timeDiff < MONTH) {
      const weeks = Math.floor(timeDiff / WEEK);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    } else if (timeDiff < YEAR) {
      const months = Math.floor(timeDiff / MONTH);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    } else {
      return new Date(seconds * 1000).toLocaleDateString(
        "en-us",
        formatOptions
      );
    }
  } else {
    throw new Error("Missing param: seconds");
  }
}
