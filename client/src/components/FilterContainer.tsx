import React from "react";
import { Form, useSubmit, Link } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import Card from "./Card";
import { FilterField } from "../interfaces/i-filters";

interface IFilterContainer {
  searchValues: Record<string, string>;
  filters: FilterField[];
  resetPath: string;
}

const FilterContainer: React.FC<IFilterContainer> = ({
  searchValues,
  filters,
  resetPath,
}) => {
  const submit = useSubmit();

  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleDebouncedChange = (form: HTMLFormElement) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      submit(form);
    }, 500);
  };

  return (
    <div className="mb-10">
      <Card>
        <Form>
          <div className="flex justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-3">
              {filters.map((field) => {
                const value = searchValues[field.name] ?? "";

                if (field.type === "select") {
                  return (
                    <FormRowSelect
                      key={field.name}
                      name={field.name}
                      labelText={field.label}
                      waterMark={value}
                      list={field.options!}
                      onChange={(e) => submit(e.currentTarget.form)}
                    />
                  );
                }
                return (
                  <FormRow
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    labelText={field.label}
                    waterMark={value}
                    onChange={(e) => {
                      const form = e.currentTarget.form;
                      if (!form) return;

                      field.debounce
                        ? handleDebouncedChange(form)
                        : submit(form);
                    }}
                  />
                );
              })}
            </div>
            <div className="flex justify-center sm:justify-end lg:justify-end flex-1">
              <Link
                to={resetPath} //"/dashboard/patients"
                className="btn btn-primary float-right mt-6"
              >
                Reset
              </Link>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default FilterContainer;
