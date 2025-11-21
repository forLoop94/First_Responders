// import React, { useEffect, useState } from "react";
// import { ITableHeader } from "../interfaces/i-table-headers";
// import { GoTrash } from "react-icons/go";
// import { LiaEditSolid } from "react-icons/lia";

// interface ITableProps {
//   headers: ITableHeader[];
//   data: any;
//   isActionColumnRequested: boolean;
// }

// const TableListApi: React.FC<ITableProps> = ({
//   headers,
//   data,
//   isActionColumnRequested,
// }) => {
//   const [tableData, setTableData] = useState<any>(data);
//   const [tableColumnMap, setTableColumnMap] = useState<string[]>([]);

//   useEffect(() => {
//     handleTableColumnMapping();
//   }, []);

//   const handleRowDelete = (id: string) => {
//     const dataClone = [...data];
//     let newData = dataClone.filter((data) => data.id !== id);
//     setTableData(newData);
//   };

//   const handleTableColumnMapping = () => {
//     let columnNames: string[] = [];
//     headers.map((item) => {
//       columnNames.push(item.label.toLowerCase());
//     });
//     setTableColumnMap(columnNames);
//   };

//   const target = headers[0].label.toLowerCase();

//   return (
//     <div className="overflow-x-auto">
//       <table className="table table-sm table-pin-rows table-pin-cols">
//         <thead>
//           <tr>
//             <th></th>
//             {headers.map((header) => (
//               <th key={header.id}>{header.label}</th>
//             ))}
//             {isActionColumnRequested ? <td>Actions</td> : ""}
//             <th></th>
//           </tr>
//         </thead>

//         <tbody>
//           {tableData.map((item: any, index: any) => (
//             <tr key={item.id}>
//               <th>{index + 1}</th>
//               <td>{item[target]}</td>
//               <td>{item.job}</td>
//               <td>{item.company}</td>
//               <td>{item.location}</td>
//               <td>{item.lastLogin}</td>
//               <td>{item.favCol}</td>
//               {isActionColumnRequested ? (
//                 <td>
//                   <div className="flex">
//                     <LiaEditSolid className="mr-5" />
//                     <GoTrash onClick={() => handleRowDelete(item.id)} />
//                   </div>
//                 </td>
//               ) : (
//                 ""
//               )}
//               <th>{index + 1}</th>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableListApi;

import React, { useMemo, useState } from "react";
import { ITableHeader } from "../interfaces/i-table-headers";
import { GoTrash } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import TableListRow from "./TableListRow";

interface ITableProps {
  headers: ITableHeader[];
  data: any;
  isActionColumnRequested: boolean;
  children: any;
}

const TableListApi: React.FC<ITableProps> = ({
  headers,
  data,
  isActionColumnRequested,
  children,
}) => {
  /* -------------------------------------------
   * 1) Local copy of data so we can delete rows
   * ----------------------------------------- */
  const [tableData, setTableData] = useState<any[]>(data);
  const [isEditRequested, setIsEditRequested] = useState<boolean>(false);

  /* ---------------------------------------------------------------
   * 2) Column map:  ["name", "job", "company", …]  ← from headers
   *    useMemo recomputes **only** when headers array changes.
   * ------------------------------------------------------------- */
  const tableColumnMap = useMemo(() => headers.map((h) => h.value), [headers]);
  const [openRowId, setOpenRowId] = useState<string | null>(null);

  /* ----------------------------
   * 3) Delete handler
   * -------------------------- */
  const handleRowDelete = (id: string) =>
    setTableData((prev) => prev.filter((row) => row.id !== id));

  /* ----------------------------
   * 4) Render
   * -------------------------- */
  return (
    <div className="overflow-x-auto">
      <table className="table table-sm table-pin-rows table-pin-cols">
        <thead>
          <tr>
            {/* Row‑number column */}
            <th scope="col" />
            {/* One header cell per <thead> entry */}
            {headers.map((h) => (
              <th scope="col" key={h.id}>
                {h.label}
              </th>
            ))}
            {isActionColumnRequested && <th scope="col">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            // <React.Fragment>
            //   <tr key={row.id}>
            //     {/* Row number */}
            //     <th scope="row">{index + 1}</th>

            //     {/* Body cells follow the same order as <thead> */}
            //     {tableColumnMap.map((colKey) => (
            //       <td key={colKey}>{row[colKey as keyof typeof row]}</td>
            //     ))}

            //     {/* Optional actions */}
            //     {isActionColumnRequested && (
            //       <td>
            //         <div className="flex">
            //           <LiaEditSolid
            //             className="mr-5"
            //             onClick={() => setIsEditRequested(!isEditRequested)}
            //           />
            //           <GoTrash onClick={() => handleRowDelete(row.id)} />
            //         </div>
            //       </td>
            //     )}
            //   </tr>
            //   {isEditRequested && <tr>khjhdsfdfd</tr>}
            // </React.Fragment>
            <TableListRow
              key={row.id}
              tableColumnMap={tableColumnMap}
              row={row}
              index={index}
              isActionColumnRequested={isActionColumnRequested}
              subRow={children}
              openRowId={openRowId}
              setOpenRowId={setOpenRowId}
              handleRowDelete={handleRowDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableListApi;
