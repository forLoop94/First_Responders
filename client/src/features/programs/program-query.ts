import { fetchPrograms } from "./program-service";

export const programsQuery = (params: any) => {
  const { search, type, page, limit } = params;

  const apiParams = {
    search: search ?? "",
    type: type ?? "SURGERY",
    page: page ?? 1,
    limit: limit ?? 5,
  };
  return {
    queryKey: [
      "items",
      apiParams.search,
      apiParams.type,
      apiParams.page,
      apiParams.limit,
    ],
    queryFn: async () => {
      const { data } = await fetchPrograms(apiParams);
      console.log(data);
      return data;
    },
  };
};
