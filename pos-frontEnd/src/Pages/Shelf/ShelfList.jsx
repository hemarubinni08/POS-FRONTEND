import React from "react";

import DynamicList from "../../components/common/DynamicList";
import POSLayout from "../../components/POSLayout";

function ShelfList() {

  const columns = [
    {
      key: "identifier",
      label: "Shelf",
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
      label: "Shelf Name",
      type: "text",
      placeholder: "Enter Name",
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
      required: true,
    },
  ];

  return (
    <POSLayout>
      <DynamicList
        title="Shelf List"
        routeName="shelf"
        columns={columns}
        editUrl="/shelf/edit"
        formFields={formFields}
        formTitle="Shelf"
        uniqueFields={["identifier"]}
      />
    </POSLayout>
  );
}

export default ShelfList;