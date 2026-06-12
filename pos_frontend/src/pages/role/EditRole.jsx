import React from "react";
import EditFormSkeleton from "../../components/EditFormSkeleton";

export default function EditRole() {
  const fields = [

    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
      placeholder: "Enter role description",
    },

    // ✅ Example for permissions/mapping (if needed)
    // {
    //   name: "permissions",
    //   label: "Permissions",
    //   type: "select",
    //   multiple: true,
    //   api: "permission",     // backend API
    //   optionLabel: "name",
    //   optionValue: "identifier"
    // }
  ];

  return (
    <EditFormSkeleton
      title="Role"
      apiPath="role"
      fields={fields}
    />
  );
}
