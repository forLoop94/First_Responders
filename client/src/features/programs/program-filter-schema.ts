import { FilterField } from "../../interfaces/i-filters";

export const programSchema: FilterField[] = [
  {
    name: "search",
    label: "Search",
    type: "search",
    debounce: true,
  },
  {
    name: "type",
    label: "Category",
    type: "select",
    options: ["SURGERY", "SCAN", "TEST"],
  },
];
