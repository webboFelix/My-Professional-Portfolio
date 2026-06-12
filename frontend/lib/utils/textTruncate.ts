/**
 * Truncate text to a maximum number of words
 * @param text - The text to truncate
 * @param wordLimit - Maximum number of words (default: 10)
 * @returns Truncated text with ellipsis if exceeds limit
 */
export function truncateToWords(text: string, wordLimit: number = 10): string {
  if (!text) return "";

  const words = text.trim().split(/\s+/);

  if (words.length <= wordLimit) {
    return text;
  }

  return words.slice(0, wordLimit).join(" ") + "...";
}
