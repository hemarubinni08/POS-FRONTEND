import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddStock() {
  const fields = [
    {
      name: "productIdentifier",
      label: "Product",
      type: "select",
      api: "product", // Looks up functional product records from: ${BASE_URL}/product/findByStatus
      optionLabel: "identifier",
      optionValue: "identifier",
      required: true,
    },
    {
      name: "warehouseIdentifier",
      label: "Warehouse",
      type: "select",
      api: "warehouse", // Looks up active warehouses from: ${BASE_URL}/warehouse/findByStatus
      optionLabel: "identifier",
      optionValue: "identifier",
      required: true,
    },
    {
      name: "quantity",
      label: "Initial Quantity",
      type: "number",
      required: true,
      placeholder: "e.g., 100",
    },
    {
      name: "minimumStock",
      label: "Minimum Stock Threshold",
      type: "number",
      required: true,
      placeholder: "e.g., 20",
    },
  ];

  return (
    <AddFormSkeleton
      title="Inventory Stock"
      apiPath="stock" // Submits the creation payload data straight to: ${BASE_URL}/inventory/add
      fields={fields}
    />
  );
}