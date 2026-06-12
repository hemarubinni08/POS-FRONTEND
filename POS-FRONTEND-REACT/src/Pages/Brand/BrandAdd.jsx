import Layout from "../../Component/Layout";
import CommonAddTemplate from "../../Component/CommonAddTemplate";

function BrandAdd() {
  const extraFields = [
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
        title="Brand"
        apiPath="brand"
        extraFields={extraFields}
        onSuccessPath="/profile/brand"
        showDescription={false}
      />
    </Layout>
  );
}

export default BrandAdd;
