"use client";

import React from "react";

import DynamicList from "../components/common/DynamicList";
import POSLayout from "../components/PosLayout";

function ModelList() {
  const columns = [
    {
      key: "identifier",
      label: "Model",
      type: "text",
    },
    {
      key: "status",
      label: "Status",
      type: "toggle",
    },
  ];

  const formFields = [
    {
      key: "identifier",
      label: "Model",
      type: "text",
      placeholder: "Enter Model Name",
      required: true,
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
    {
    key: "createdBy",
    label: "Created By",
    type: "text",
    required: false,
  },
  {
    key: "createdOn",
    label: "Created On",
    type: "text",
    required: false,
  },
  {
    key: "modifiedBy",
    label: "Modified By",
    type: "text",
    required: false,
  },
  {
    key: "modifiedOn",
    label: "Modified On",
    type: "text",
    required: false,
  },
  ];

  return (
    <POSLayout>
      <DynamicList
        title="Model List"
        routeName="model"
        columns={columns}
        formFields={formFields}
        formTitle="Model"
        uniqueFields={["identifier"]}
      />
    </POSLayout>
  );
}

export default ModelList;