export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function formatTimeAgo(value: string | Date) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) return "Unknown date";

  const elapsedSeconds = Math.floor((Date.now() - timestamp) / 1000);
  const absoluteSeconds = Math.abs(elapsedSeconds);
  if (absoluteSeconds < 60) return elapsedSeconds < 0 ? "in a moment" : "just now";

  const units = [
    { name: "year", seconds: 31_536_000 },
    { name: "month", seconds: 2_592_000 },
    { name: "week", seconds: 604_800 },
    { name: "day", seconds: 86_400 },
    { name: "hour", seconds: 3_600 },
    { name: "min", seconds: 60 },
  ];
  const unit = units.find(({ seconds }) => absoluteSeconds >= seconds);
  if (!unit) return "just now";

  const amount = Math.floor(absoluteSeconds / unit.seconds);
  const label =
    unit.name === "min" ? unit.name : `${unit.name}${amount === 1 ? "" : "s"}`;
  return elapsedSeconds < 0
    ? `in ${amount} ${label}`
    : `${amount} ${label} ago`;
}

export function newestFirst<T>(items: readonly T[]): T[] {
  return [...items].reverse();
}
