import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddUser() {
  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter full user name...",
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      placeholder: "e.g., janesmith_pos",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Enter secure initial password...",
    },
    {
      name: "phoneNo",
      label: "Phone No",
      type: "text",
      required: true,
      placeholder: "Enter contact number...",
    },
    {
      name: "roles", 
      label: "Security Roles",
      type: "select",
      api: "role", 
      optionLabel: "identifier",
      optionValue: "identifier",
      required: true,
      multiple: true, 
    },
  ];

  return (
    <AddFormSkeleton
      title="User"
      apiPath="user"
      endpoint="register" // Custom override to hit: ${BASE_URL}/user/register
      fields={fields}
    />
  );
}