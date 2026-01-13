export const fetchPaginated = async ({
  model,
  where,
  orderBy,
  skip,
  take,
}: {
  model: any;
  where: any;
  orderBy: any;
  skip: number;
  take: number;
}) => {
  const [data, total] = await Promise.all([
    model.findMany({ where, orderBy, skip, take }),
    model.count({ where }),
  ]);

  return { data, total };
};
