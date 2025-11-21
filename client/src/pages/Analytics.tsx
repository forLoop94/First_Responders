import React, { useEffect, useState } from "react";
import TableListApi from "../components/TableListApi";
import { ITableHeader } from "../interfaces/i-table-headers";
import UsetableListApi from "../use-table-list-api";
import { getPatients } from "../services/patients-service";
const Analytics: React.FC = () => {
  // const headers: any = [
  //   { id: "name", label: "Name" },
  //   { id: "email", label: "Email" },
  //   { id: "isVerified", label: "Verification Status" },
  //   { id: "role", label: "Role" },
  // ];

  const headers: ITableHeader[] = [
    { id: "name", value: "name", label: "Name" },
    { id: "email", value: "email", label: "Email" },
    { id: "isVerified", value: "isVerified", label: "Verification Status" },
    { id: "role", value: "role", label: "Role" },
  ];

  const [tableList, setTableList] = useState([]);

  const data = [
    {
      id: "hassan",
      name: "Amed Hassan",
      email: "ah@mail.com",
      verification: true,
      role: "Lecturer",
    },
    {
      id: "saraki",
      name: "Saraki Hassan",
      email: "ah@mail.com",
      verification: true,
      role: "Lecturer",
    },
    {
      id: "Habibi",
      name: "Amed Habibi",
      email: "ah@mail.com",
      verification: true,
      role: "Lecturer",
    },
    {
      id: "andrews",
      name: "Charles Andrews",
      email: "ah@mail.com",
      verification: true,
      role: "Lecturer",
    },
  ];

  const tablePayload = {
    get: getPatients,
    getPaginated: getPatients,
  };

  const tableListApi = new UsetableListApi(tablePayload);
  //tableListApi.getList();
  const tableListAsync = async () => {
    let arr = await tableListApi.getPaginatedList();
    setTableList(arr);
    console.log(tableList);
  };

  useEffect(() => {
    tableListAsync();
  }, []);

  if (tableList.length === 0) {
    return <div>No data to display</div>;
  }

  return (
    <div>
      <TableListApi
        headers={headers}
        data={tableList}
        isActionColumnRequested={true}
      >
        <section>
          <h6>Small header</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            doloribus voluptas, aliquid magni cumque sunt neque ea id natus aut
            eum atque animi? Minima labore obcaecati cum praesentium? Labore,
            fuga et. Adipisci, obcaecati tempora quibusdam dolor ad ex
            architecto quaerat repellendus harum corrupti sunt. Vero.
          </p>
        </section>
      </TableListApi>
    </div>
  );
};

export default Analytics;
