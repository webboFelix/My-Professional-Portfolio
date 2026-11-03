import { formatTimeAgo } from "@/lib/utils";

interface RelativeTimeProps {
  date?: string | null;
  className?: string;
}

export function RelativeTime({ date, className }: RelativeTimeProps) {
  if (!date) return null;

  const parsedDate = new Date(date);
  const isValidDate = !Number.isNaN(parsedDate.getTime());

  return (
    <time
      dateTime={isValidDate ? parsedDate.toISOString() : undefined}
      title={isValidDate ? parsedDate.toLocaleString() : undefined}
      className={className}
    >
      {formatTimeAgo(date)}
    </time>
  );
}
