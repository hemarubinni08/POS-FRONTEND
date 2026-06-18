"use client";

import React from "react";

import DynamicList from "../components/common/DynamicList";
import POSLayout from "../components/PosLayout";

function RoleList() {
  const columns = [
    {
      key: "identifier",
      label: "Role",
      type: "text",
    },
    {
      key: "description",
      label: "Description",
      type: "text",
    },
  ];

  const formFields = [
    {
      key: "identifier",
      label: "Role Name",
      type: "text",
      placeholder: "Enter Role",
      required: true,
      readOnlyOnEdit: true,

    },
    {
      key: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter Description",
      required: false,
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
        title="Role List"
        routeName="role"
        columns={columns}
        formFields={formFields}
        formTitle="Role"
        uniqueFields={["identifier"]}
      />
    </POSLayout>
  );
}

export default RoleList;