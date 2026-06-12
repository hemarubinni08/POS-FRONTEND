import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddBrand() {
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
      title="Brand"
      apiPath="brand" // Submits form payload to: ${BASE_URL}/brand/save
      fields={fields}
    />
  );
}