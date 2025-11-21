import { LoaderFunctionArgs } from "react-router-dom";
import { getPatients } from "../services/patients-service";
import { QueryClient } from "@tanstack/react-query";

export const patientsQuery = (params: any) => {
  const { search, name, email, sort, page } = params;
  return {
    queryKey: [
      "patients",
      search ?? "",
      name ?? "",
      email ?? "",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await getPatients(params);
      return data;
    },
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams.entries());

    await queryClient.ensureQueryData(patientsQuery(params));
    return {
      searchValues: { ...params },
    };
  };
