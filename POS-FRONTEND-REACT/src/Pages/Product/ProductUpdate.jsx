import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import CommonUpdateTemplate from "../../Component/CommonUpdateTemplate";

function ProductUpdate() {
  const { id } = useParams();

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
      apiEndpoint: "/category/findAllActive",
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
      <CommonUpdateTemplate
        title="Product"
        apiPath="product"
        recordId={id}
        extraFields={extraFields}
        onSuccessPath="/profile/product"
      />
    </Layout>
  );
}

export default ProductUpdate;
