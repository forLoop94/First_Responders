import React, { useMemo, useState } from "react";
import { ITableHeader } from "../interfaces/i-table-headers";
import { GoTrash } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";

interface ITableProps {
  tableColumnMap: string[];
  row: any;
  index: any;
  isActionColumnRequested: boolean;
  subRow: any;
  openRowId: string | null;
  setOpenRowId: (id: string | null) => void;
  handleRowDelete: any;
}

const TableListRow: React.FC<ITableProps> = ({
  tableColumnMap,
  row,
  index,
  isActionColumnRequested,
  subRow,
  openRowId,
  setOpenRowId,
  handleRowDelete,
}) => {
  //const [isEditRequested, setIsEditRequested] = useState<boolean>(false);
  const isEditRequested = openRowId === row.id;

  return (
    <React.Fragment>
      <tr key={row.id}>
        {/* Row number */}
        <th scope="row">{index + 1}</th>

        {/* Body cells follow the same order as <thead> */}
        {tableColumnMap.map((colKey) => (
          <td key={colKey}>{row[colKey as keyof typeof row]}</td>
        ))}

        {/* Optional actions */}
        {isActionColumnRequested && (
          <td>
            <div className="flex">
              <LiaEditSolid
                className="mr-5"
                // onClick={() => setIsEditRequested(!isEditRequested)}
                onClick={() => {
                  if (isEditRequested) {
                    setOpenRowId(null); // close current
                  } else {
                    setOpenRowId(row.id); // open this row
                  }
                }}
              />
              <GoTrash onClick={() => handleRowDelete(row.id)} />
            </div>
          </td>
        )}
      </tr>
      {isEditRequested && (
        <tr>
          <td colSpan={100}>{subRow}</td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default TableListRow;
