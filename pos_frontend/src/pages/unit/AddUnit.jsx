import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddUnit() {
  // Configured field layouts mapping exactly to the Brand list structure
  const fields = [
   
  ];

  return (
    <AddFormSkeleton
      title="Unit"
      apiPath="unit" // Submits form payload to: ${BASE_URL}/unit/save
      fields={fields}
    />
  );
}