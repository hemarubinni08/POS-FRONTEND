import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddRole() {
  // Configured field layouts mapping exactly to the Brand list structure
  const fields = [
   
    
    {
      name: "description",
      label: "Description",
      type: "text",
      required: false,
      placeholder: "Enter brief brand description or notes...",
    },
  ];

  return (
    <AddFormSkeleton
      title="Role"
      apiPath="role" // Submits form payload to: ${BASE_URL}/role/save
      fields={fields}
    />
  );
}