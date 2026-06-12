import React, { useEffect, useState } from "react";
import axios from "axios";
import DynamicList from "../../components/common/DynamicList";
import POSLayout from "../../components/POSLayout";
import commonApi from "../../components/api/commonApi";

function RackList() {

  const [shelfs, setShelfs] = useState([]);

  // LOAD SHELFS
  useEffect(() => {
    commonApi
      .list("shelf", {
        page: 0,
        sizePerPage: 1000,
        sortDirection: "ASC",
        sortField: "id",
        search: "",
      })
      .then((res) => {
        setShelfs(res.data.dtoList || []);
      })
      .catch((err) => console.log(err));
  }, []);


  // TABLE COLUMNS
  const columns = [

    {
      key: "identifier",
      label: "Rack",
      type: "text",
    },

    {
      key: "shelf",
      label: "Shelf",
      type: "list",
    },

    {
      key: "status",
      label: "Status",
      type: "toggle",
    },
  ];

  // FORM FIELDS
  const formFields = [

    {
      key: "identifier",
      label: "Rack Name",
      type: "text",
      placeholder: "Enter Rack Name",
      required: true,
    },

    {
      key: "shelf",
      label: "Shelfs",
      type: "multiselect",
      options: shelfs,
      optionLabel: "identifier",
      optionValue: "identifier",
    },

    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        {
          label: "Active",
          value: true,
        },
        {
          label: "Inactive",
          value: false,
        },
      ],
      optionLabel: "label",
      optionValue: "value",
    },
  ];

  return (

    <POSLayout>

      <DynamicList
        title="Rack List"
        routeName="rack"
        columns={columns}
        formFields={formFields}
        formTitle="Rack"
        uniqueFields={["identifier"]}
      />

    </POSLayout>
  );
}

export default RackList;