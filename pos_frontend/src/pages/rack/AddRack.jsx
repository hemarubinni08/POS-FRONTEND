import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddRack() {
  const fields = [
   
    {
      name: "shelfs", // Named 'shelfs' to match your list rendering rule (item.shelfs)
      label: "Assign Shelves",
      type: "select", 
      api: "shelf", // Pulls valid shelf configurations from: ${BASE_URL}/shelf/findByStatus
      optionLabel: "identifier",
      optionValue: "identifier",
      required: true,
      multiple: true, // Enables multi-selection to capture multiple shelf assignments into a Java-friendly ArrayList
    }
  ];

  return (
    <AddFormSkeleton
      title="Rack"
      apiPath="rack" // Dispatches the save payload to: ${BASE_URL}/rack/add
      fields={fields}
    />
  );
}