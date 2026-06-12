import Layout from "../../../components/Layout";
import CommonEdit from "../../../components/CommonEdit";

function EditProduct() {

  const extraFields = [

    {
      key: "productName",
      label: "Product Name",
      type: "text",
      required: true,
    },

    {
      key: "brand",
      label: "Brand",
      type: "select",
      apiPath: "brand",
      required: true,
    },

    {
      key: "models",
      label: "Model",
      type: "select",
      apiPath: "model",
      required: true,
    },

    {
      key: "category",
      label: "Category",
      type: "multiselect",
      apiPath: "category",
      valueFormat: "csv",
      required: true,
    },

    {
      key: "status",
      label: "Status",
      type: "select",
      valueType: "boolean",
      required: true,
      options: [
        {
          label: "Active",
          value: "true",
        },
        {
          label: "Inactive",
          value: "false",
        },
      ],
    },

  ];

  return (

    <Layout>
       <CommonEdit
        title="Product"
        apiPath="product"
        extraFields={extraFields}
        onSuccessPath="/dashboard/product/list"
      />
    </Layout>
  );
}

export default EditProduct;
