import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import CommonUpdateTemplate from "../../Component/CommonUpdateTemplate";

function RacksUpdate() {
  const { id } = useParams();

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
      <CommonUpdateTemplate
        title="Racks"
        apiPath="racks"
        recordId={id}
        extraFields={extraFields}
        onSuccessPath="/profile/racks"
        showDescription={false}
      />
    </Layout>
  );
}

export default RacksUpdate;
