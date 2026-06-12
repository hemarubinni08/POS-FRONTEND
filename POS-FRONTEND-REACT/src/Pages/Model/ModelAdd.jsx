import Layout from "../../Component/Layout";
import CommonAddTemplate from "../../Component/CommonAddTemplate";

function ModelAdd() {
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
        title="Model"
        apiPath="models"
        extraFields={extraFields}
        onSuccessPath="/profile/models"
        showDescription={false}
      />
    </Layout>
  );
}

export default ModelAdd;
