interface SearchOptions {
  search?: string;
  fields?: string[];
  base?: Record<string, any>;
  equals?: Record<string, any>;
}

export const buildFilters = ({
  search,
  fields = [],
  base = {},
  equals = {},
}: SearchOptions) => {
  const where: any = { ...base };

  if (search && fields.length) {
    where.OR = fields.map((field) => ({
      [field]: { contains: search, mode: "insensitive" },
    }));
  }

  Object.entries(equals).forEach(([key, value]) => {
    if (value !== undefined) where[key] = value;
  });

  return where;
};
