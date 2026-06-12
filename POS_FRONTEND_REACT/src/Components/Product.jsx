import Edit from "./Edit";

const Product = () => {
  const fields = [
    {
      name: "identifier",
      label: "Product Name",
      type: "text",
      readOnly: true,
    },
    {
      name: "category",
      label: "Category",
      type: "multiDropdown",
      api: "/category/list",
    },
    {
      name: "models",
      label: "Model",
      type: "singleDropdown",
      api: "/models/list-active",
    },
    {
      name: "brand",
      label: "Brand",
      type: "singleDropdown",
      api: "/brand/list-active",
    },
    {
      name: "unit",
      label: "Unit",
      type: "singleDropdown",
      api: "/unit/list-active",
    },
  ];

  return <Edit urlName="product" fields={fields} />;
};

export default Product;
