import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1s",
    ss: "%dS",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%d days",
    w: "a week",
    ww: "%d weeks",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

export function formatTimeRelative(date: Date): string {
  const now = moment();
  const inputDate = moment(date);

  if (now.diff(inputDate, "days") >= 1) {
    // If the difference is greater than or equal to 1 day, show absolute time
    return inputDate.format("MMM D");
  } else {
    return inputDate.fromNow(true);
  }
}
