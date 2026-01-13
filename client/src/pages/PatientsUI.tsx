import React, { createContext } from "react";
import { useLoaderData } from "react-router-dom";
import FilterContainer from "../components/FilterContainer";
import { useQuery } from "@tanstack/react-query";
import { patientsQuery } from "../loaders/patientsLoader";
import Patients from "../components/Patients";
import PaginationButtons from "../components/PaginationButtons";
import { patientsFilters } from "../filter-schemas/patients-filter";

export const PatientsContext = createContext<any>(null);

const PatientsUI: React.FC = () => {
  const { searchValues } = useLoaderData();

  const { data } = useQuery(patientsQuery(searchValues)); // isLoading, error to be destructured alongside data

  return (
    <PatientsContext.Provider value={{ data, searchValues }}>
      <FilterContainer
        searchValues={searchValues}
        filters={patientsFilters}
        resetPath="/dashboard/patients"
      />
      <Patients />
      <PaginationButtons />
    </PatientsContext.Provider>
  );
};

export default PatientsUI;
