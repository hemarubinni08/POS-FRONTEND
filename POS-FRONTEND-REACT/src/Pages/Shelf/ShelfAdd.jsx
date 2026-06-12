import Layout from "../../Component/Layout";
import CommonAddTemplate from "../../Component/CommonAddTemplate";

function ShelfAdd() {
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
        title="Shelf"
        apiPath="shelf"
        extraFields={extraFields}
        onSuccessPath="/profile/shelf"
        showDescription={false}
      />
    </Layout>
  );
}

export default ShelfAdd;
