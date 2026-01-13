export type FilterInputType = "text" | "search" | "email" | "select";

export interface FilterField {
  name: string;
  label: string;
  type: FilterInputType;
  debounce?: boolean;
  options?: string[];
}
