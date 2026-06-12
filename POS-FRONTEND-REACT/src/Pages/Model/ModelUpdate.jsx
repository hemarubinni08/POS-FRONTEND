import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import CommonUpdateTemplate from "../../Component/CommonUpdateTemplate";

function ModelUpdate() {
  const { id } = useParams();

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
      <CommonUpdateTemplate
        title="Model"
        apiPath="models"
        recordId={id}
        recordParam="id"
        extraFields={extraFields}
        onSuccessPath="/profile/models"
        showDescription={false}
      />
    </Layout>
  );
}

export default ModelUpdate;
