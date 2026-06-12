import Layout from "../../Component/Layout";
import CommonAddTemplate from "../../Component/CommonAddTemplate";

function RacksAdd() {
  const extraFields = [
    {
      key: "shelf",
      label: "Shelf",
      type: "multiselect",
      apiEndpoint: "/shelf/findAllActive",
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
        title="Racks"
        apiPath="racks"
        extraFields={extraFields}
        onSuccessPath="/profile/racks"
        showDescription={false}
      />
    </Layout>
  );
}

export default RacksAdd;
