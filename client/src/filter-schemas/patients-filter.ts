import { E_SORT_VALUES } from "../enums/e-sorting";
import { FilterField } from "../interfaces/i-filters";

export const patientsFilters: FilterField[] = [
  {
    name: "search",
    label: "Search",
    type: "search",
    debounce: true,
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    debounce: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    debounce: true,
  },
  {
    name: "sort",
    label: "Sort",
    type: "select",
    options: Object.values(E_SORT_VALUES),
  },
];
