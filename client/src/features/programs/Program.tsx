import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { programsQuery } from "./program-loader";
import FilterContainer from "../../components/FilterContainer";
import { programSchema } from "./program-filter-schema";
import { createContext } from "react";
import PaginationButtons from "../../components/PaginationButtons";

export const ProgramContext = createContext<any>(null);

const Programs: React.FC = () => {
  const { searchValues } = useLoaderData();

  const { data } = useQuery(programsQuery(searchValues));
  console.log(data);

  return (
    <ProgramContext.Provider value={{ data, searchValues }}>
      <FilterContainer
        searchValues={searchValues}
        filters={programSchema}
        resetPath="/dashboard/patients"
      />
      <PaginationButtons data={data} />
    </ProgramContext.Provider>
  );
};

export default Programs;
