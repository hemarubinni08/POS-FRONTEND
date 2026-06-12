import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddWarehouse() {
  const fields = [
   
    {
      name: "location",
      label: "Location / Address",
      type: "text",
      required: true,
      placeholder: "e.g., 5th Industrial Avenue, Sector 4",
    },
    {
      name: "manager",
      label: "Manager",
      type: "text", // Can be switched to "select" if utilizing an employee endpoint
      // api: "employee", 
      // optionLabel: "name",
      // optionValue: "identifier",
      required: true,
      placeholder: "Enter manager name...",
    }
  ];

  return (
    <AddFormSkeleton
      title="Warehouse"
      apiPath="warehouse" // Submits payload directly via POST to: ${BASE_URL}/warehouse/add
      fields={fields}
    />
  );
}