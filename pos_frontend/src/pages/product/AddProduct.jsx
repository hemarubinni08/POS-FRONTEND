import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

export default function AddProduct() {
  // Define configuration configurations directly as schemas 
  // AddFormSkeleton will auto-fetch and render them sequentially
  const fields = [
    {
      name: "name",
      label: "Product Name",
      type: "text",
      required: true,
    },
    {
      name: "brand",
      label: "Brand",
      type: "select",
      api: "brand", // Maps to: ${BASE_URL}/brand/list
      multiple: false,
      optionLabel: "identifier",
      optionValue: "identifier",
    },
    {
      name: "unit",
      label: "Unit",
      type: "select",
      api: "unit", // Maps to: ${BASE_URL}/unit/list
      multiple: false,
      optionLabel: "identifier",
      optionValue: "identifier",
    },
    {
      name: "model",
      label: "Model",
      type: "select",
      api: "model", // Maps to: ${BASE_URL}/models/list
      multiple: false,
      optionLabel: "identifier",
      optionValue: "identifier",
    },
    {
      name: "categories",
      label: "Category",
      type: "select",
      api: "category", // Maps to: ${BASE_URL}/category/list
      multiple: true,  // Activates array collection pipeline
      optionLabel: "identifier",
      optionValue: "identifier",
    },
  ];

  return (
    <AddFormSkeleton
      title="Product"
      apiPath="product"
      fields={fields}
    />
  );
}