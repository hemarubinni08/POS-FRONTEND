import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddShelf() {
  // Configured field layouts mapping exactly to the Brand list structure
  const fields = [
   
  ];

  return (
    <AddFormSkeleton
      title="Shelf"
      apiPath="shelf" // Submits form payload to: ${BASE_URL}/shelf/save
      fields={fields}
    />
  );
}