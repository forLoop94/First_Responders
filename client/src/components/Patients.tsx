import React, { useContext, useEffect, useState } from "react";
import { ITableHeader } from "../interfaces/i-table-headers";
import { GoTrash } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import Modal from "../components/Modal";
import { PatientsContext } from "../pages/PatientsUI";
import { IPatientData } from "../interfaces/i-patients";

const Patients: React.FC = () => {
  const { data } = useContext(PatientsContext);

  const patients = data?.patients || [];
  // const totalPatients = data?.totalPatients || 0;
  // const numOfPages = data?.numOfPages || 1;

  const headers: ITableHeader[] = [
    { id: "name", value: "name", label: "Name" },
    { id: "email", value: "email", label: "Email" },
    { id: "isVerified", value: "isVerified", label: "Verification Status" },
    { id: "role", value: "role", label: "Role" },
  ];

  const [tableData, setTableData] = useState<IPatientData[]>(patients);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const isActionColumnRequested = true;

  useEffect(() => {
    setTableData(patients);
  }, [patients]);

  const handleConfirmDelete = (id: string) => {
    let newData = tableData.filter((data: any) => data.id !== id);
    setTableData(newData);
    setDeleteTargetId(null);
  };

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
