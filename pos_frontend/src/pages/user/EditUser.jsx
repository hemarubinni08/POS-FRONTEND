import React from "react";
import EditFormSkeleton from "../../components/EditFormSkeleton.jsx";

export default function UserEdit() {
  const fields = [
    {
      name: "identifier",
      label: "Identifier",
      type: "text",
      disabled: true, // prevent editing of identifier

    },
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "phoneNo",
      label: "Phone Number",
      type: "text",
    },
    {
      name: "roles",
      label: "Roles",
      type: "select",
      multiple: true,
      api: "role",
      endpoint: "findByStatus",   // hits GET /api/role/findByStatus
      optionLabel: "identifier",
      optionValue: "identifier",
    },
  ];

  return (
    <EditFormSkeleton
      title="User"
      apiPath="user"
      fields={fields}
      paramKey="username"       // used in route param + update payload key
      getParamKey="username"    // used for GET /api/user/get?username=...
    />
  );
}