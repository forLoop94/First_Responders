export const buildSort = (
  sort: string | undefined,
  options: Record<string, any>,
  fallback = { createdAt: "desc" }
) => {
  return options[sort || ""] || fallback;
};
