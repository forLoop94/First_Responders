import { LoaderFunctionArgs } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { fetchPrograms } from "./program-service";

export const programsQuery = (params: any) => {
  const { search, type, page, limit } = params;

  const apiParams = {
    search: search ?? "",
    type: type ?? "SURGERY",
    page: page ?? 1,
    limit: limit ?? 1,
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

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    await queryClient.ensureQueryData(programsQuery(params));
    console.log({ ...params });
    return {
      searchValues: { ...params },
    };
  };
