import React, { createContext } from "react";
import { useLoaderData } from "react-router-dom";
import FilterContainer from "../components/FilterContainer";
import { useQuery } from "@tanstack/react-query";
import { patientsQuery } from "../loaders/patientsLoader";
import Patients from "../components/Patients";

export const PatientsContext = createContext<any>(null);

const PatientsUI: React.FC = () => {
  const { searchValues } = useLoaderData();

  const { data, isLoading, error } = useQuery(patientsQuery(searchValues));

  return (
    <PatientsContext.Provider value={{ data, searchValues }}>
      <FilterContainer />
      <Patients />
    </PatientsContext.Provider>
  );
};

export default PatientsUI;
