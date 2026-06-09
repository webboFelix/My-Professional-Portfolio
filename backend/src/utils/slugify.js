export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // spaces to hyphens
    .replace(/[^\w\-]+/g, "") // remove non-word chars
    .replace(/\-\-+/g, "-"); // replace multiple hyphens
};
