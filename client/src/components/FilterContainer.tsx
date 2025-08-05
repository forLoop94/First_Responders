import React, { ChangeEvent, useContext } from "react";
import { Form, useSubmit, Link } from "react-router-dom";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import { E_SORT_VALUES } from "../enums/e-sorting";
import Card from "./Card";
import { PatientsContext } from "../pages/PatientsUI";

const FilterContainer: React.FC = () => {
  const { searchValues } = useContext(PatientsContext);

  const { search, name, email, sort } = searchValues;
  const submit = useSubmit();

  const debounce = (onChange: (form: HTMLFormElement) => void) => {
    let timeout: NodeJS.Timeout;

    return (e: ChangeEvent<HTMLInputElement>) => {
      const form = e.currentTarget.form;
      if (!form) return;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Card>
      <Form>
        <div className="flex justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-3">
            <FormRow
              type="search"
              name="search"
              labelText="Search"
              waterMark={search}
              onChange={debounce((form) => {
                submit(form);
              })}
            />
            <FormRow
              type="text"
              name="name"
              labelText="Name"
              waterMark={name}
              onChange={debounce((form) => {
                submit(form);
              })}
            />
            <FormRow
              type="email"
              name="email"
              labelText="Email"
              waterMark={email}
              onChange={debounce((form) => {
                submit(form);
              })}
            />
            <FormRowSelect
              name="sort"
              labelText="Sort"
              waterMark={sort}
              list={[...Object.values(E_SORT_VALUES)]}
              onChange={(e) => {
                submit(e.currentTarget.form);
              }}
            />
          </div>
          <div className="flex justify-center sm:justify-end lg:justify-end flex-1">
            <Link
              to="/dashboard/patients"
              className="btn btn-primary float-right mt-6"
            >
              Reset
            </Link>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default FilterContainer;
