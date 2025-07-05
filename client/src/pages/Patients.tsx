import React, { useState } from "react";
import TableListApi from "../components/TableListApi";
import { ITableHeader } from "../interfaces/i-table-headers";
import { GoTrash } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import Modal from "../components/Modal";

const Patients = () => {
  const headers: ITableHeader[] = [
    { id: "name", value: "name", label: "Name" },
    { id: "job", value: "job", label: "Job" },
    { id: "company", value: "company", label: "Company" },
    { id: "location", value: "location", label: "Location" },
    { id: "lastLogin", value: "lastLogin", label: "Last Login" },
    { id: "favoriteColor", value: "favCol", label: "Favorite Color" },
  ];

  const data = [
    {
      id: "1",
      name: "Marjy Ferencz",
      job: "Office Assistant I",
      company: "Rowe-Schoen",
      location: "Russia",
      lastLogin: "3/25/2021",
      favCol: "Crimson",
    },
    {
      id: "2",
      name: "Chris Cavaneigh",
      job: "Office Assistant I",
      company: "Rowe-Schoen",
      location: "Russia",
      lastLogin: "3/25/2021",
      favCol: "Crimson",
    },
    {
      id: "3",
      name: "Michael Balanz",
      job: "Office Assistant I",
      company: "Rowe-Schoen",
      location: "Russia",
      lastLogin: "3/25/2021",
      favCol: "Crimson",
    },
    {
      id: "4",
      name: "Florida macron",
      job: "Office Assistant I",
      company: "Rowe-Schoen",
      location: "Russia",
      lastLogin: "3/25/2021",
      favCol: "Crimson",
    },
    {
      id: "5",
      name: "Bull Binance",
      job: "Office Assistant I",
      company: "Rowe-Schoen",
      location: "Russia",
      lastLogin: "3/25/2021",
      favCol: "Crimson",
    },
    {
      id: "6",
      name: "Angela Microvic",
      job: "Office Assistant I",
      company: "Rowe-Schoen",
      location: "Russia",
      lastLogin: "3/25/2021",
      favCol: "Crimson",
    },
  ];

  const [tableData, setTableData] = useState<any>(data);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const isActionColumnRequested = true;

  const handleConfirmDelete = (id: string) => {
    let newData = tableData.filter((data: any) => data.id !== id);
    setTableData(newData);
    setDeleteTargetId(null);
  };

  // return (
  //   <div>
  //     <h1>Patients</h1>
  //     <TableListApi
  //       headers={headers}
  //       data={data}
  //       isActionColumnRequested={isActionColumnRequested}
  //     />
  //   </div>
  // );

  return (
    <div className="overflow-x-auto">
      <table className="table table-sm table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            {headers.map((header) => (
              <th key={header.id}>{header.label}</th>
            ))}
            {isActionColumnRequested ? <td>Actions</td> : ""}
            <th></th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((item: any, index: any) => (
            <tr key={item.id}>
              <th>{index + 1}</th>
              <td>{item[headers[0].value]}</td>
              <td>{item[headers[1].value]}</td>
              <td>{item[headers[2].value]}</td>
              <td>{item[headers[3].value]}</td>
              <td>{item[headers[4].value]}</td>
              <td>{item[headers[5].value]}</td>
              {isActionColumnRequested ? (
                <td>
                  <div className="flex">
                    <LiaEditSolid className="mr-5" />
                    <GoTrash
                      className="cursor-pointer"
                      onClick={() => setDeleteTargetId(item.id)}
                    />
                  </div>
                </td>
              ) : (
                ""
              )}
              <th>{index + 1}</th>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteTargetId && (
        <Modal>
          <div className="flex flex-col items-center">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-between mt-5 w-1/2">
              <button
                className="btn btn-primary"
                onClick={() => handleConfirmDelete(deleteTargetId)}
              >
                Yes
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteTargetId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Patients;
