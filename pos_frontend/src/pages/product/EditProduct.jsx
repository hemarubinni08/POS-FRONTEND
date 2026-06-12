import EditFormSkeleton from "../../components/EditFormSkeleton";

export default function EditProduct() {
  const fields = [
    {
      name: "name",
      label: "Product Name",
      type: "text",
    },

    // ✅ BRAND (IMPORTANT: must match API response)
    {
      name: "brand",
      label: "Brand",
      type: "select",
      api: "brand",
      optionLabel: "identifier",
      optionValue: "identifier", // make sure API returns { id, name }
    },

    // ✅ UNIT
    {
      name: "unit",
      label: "Unit",
      type: "select",
      api: "unit",
      optionLabel: "identifier",
      optionValue: "identifier",
    },

    // ✅ MODEL
    {
      name: "model",
      label: "Model",
      type: "select",
      api: "model",
      optionLabel: "identifier",
      optionValue: "identifier",
    },

    
    {
      name: "categories",
      label: "Categories",
      type: "select",
      api: "category",
      multiple: true,
      optionLabel: "identifier",
      optionValue: "identifier",
    },
  ];

  return (
    <EditFormSkeleton
      title="Product"
      apiPath="product"
      fields={fields}
    />
  );
}