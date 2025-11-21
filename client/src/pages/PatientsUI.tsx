import React, { createContext } from "react";
import { useLoaderData } from "react-router-dom";
import FilterContainer from "../components/FilterContainer";
import { useQuery } from "@tanstack/react-query";
import { patientsQuery } from "../loaders/patientsLoader";
import Patients from "../components/Patients";
import PaginationButtons from "../components/PaginationButtons";

export const PatientsContext = createContext<any>(null);

const PatientsUI: React.FC = () => {
  const { searchValues } = useLoaderData();

  const { data } = useQuery(patientsQuery(searchValues)); // isLoading, error - destructure this two along with data

  return (
    <PatientsContext.Provider value={{ data, searchValues }}>
      <FilterContainer />
      <Patients />
      <PaginationButtons />
    </PatientsContext.Provider>
  );
};

export default PatientsUI;
