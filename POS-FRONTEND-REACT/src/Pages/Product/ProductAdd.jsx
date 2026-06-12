import Layout from "../../Component/Layout";
import CommonAddTemplate from "../../Component/CommonAddTemplate";

function ProductAdd() {
  const extraFields = [
    {
      key: "productName",
      label: "Product Name",
      type: "text",
      placeholder: "Enter product name",
      required: true,
    },
    {
      key: "brand",
      label: "Brand",
      type: "select",
      apiEndpoint: "/brand/findAllActive",
      required: true,
    },
    {
      key: "model",
      label: "Model",
      type: "select",
      apiEndpoint: "/models/findAllActive",
      required: true,
    },
    {
      key: "category",
      label: "Category",
      type: "multiselect",
      apiEndpoint: "/category/findActiveSubCategories",
      asArray: true,
      required: true,
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      valueType: "boolean",
      required: true,
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" },
      ],
    },
  ];

  return (
    <Layout>
      <CommonAddTemplate
        title="Product"
        apiPath="product"
        extraFields={extraFields}
        onSuccessPath="/profile/product"
      />
    </Layout>
  );
}

export default ProductAdd;
