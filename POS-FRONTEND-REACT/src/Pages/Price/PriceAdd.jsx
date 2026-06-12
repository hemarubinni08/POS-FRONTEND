import Layout from "../../Component/Layout";
import CommonAddTemplate from "../../Component/CommonAddTemplate";

function PriceAdd() {
  const extraFields = [
    {
      key: "value",
      label: "Value",
      type: "number",
      required: true,
      placeholder: "Enter price value",
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
        title="Price"
        apiPath="price"
        extraFields={extraFields}
        onSuccessPath="/profile/price"
        showDescription={false}
      />
    </Layout>
  );
}

export default PriceAdd;
