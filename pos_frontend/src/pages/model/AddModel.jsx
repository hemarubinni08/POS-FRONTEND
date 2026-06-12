import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddModel() {
  // Configured field layouts mapping exactly to the Brand list structure
  const fields = [
   
  ];

  return (
    <AddFormSkeleton
      title="Model"
      apiPath="model" // Submits form payload to: ${BASE_URL}/brand/save
      fields={fields}
    />
  );
}