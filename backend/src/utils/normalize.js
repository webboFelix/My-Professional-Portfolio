export function normalizeDate(date) {
  if (!date) return new Date().toISOString();
  if (typeof date === "string" && date.includes("T")) return date;
  return new Date(`${date}T00:00:00.000Z`).toISOString();
}

export function parseTags(tags) {
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
  }
  return [];
}
