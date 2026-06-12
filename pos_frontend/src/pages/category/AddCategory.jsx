import React from "react";
import AddFormSkeleton from "../../components/AddFormSkeleton";

 export default function AddCategory() {
  // Configured field layouts matching your list columns and nested data models
  const fields = [

   
    {
      name: "superCategory",
      label: "Super Category",
      type: "select",
      api: "category", // Hits ${BASE_URL}/category/findByStatus to fetch other options
      optionLabel: "identifier", // Maps display to match your list rendering rule
      optionValue: "identifier",
      required: false, // Optional so you can create a root level category
    },
  ];

  return (
    <AddFormSkeleton
      title="Category"
      apiPath="category" // Submits form payload to: ${BASE_URL}/category/add
      fields={fields}
    />
  );
}