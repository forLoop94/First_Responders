import { LoaderFunctionArgs } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { programsQuery } from "./program-query";

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
