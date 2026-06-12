import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import CommonUpdateTemplate from "../../Component/CommonUpdateTemplate";

function ShelfUpdate() {
  const { identifier } = useParams();

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
        title="Shelf"
        apiPath="shelf"
        recordId={identifier}
        recordParam="identifier"
        extraFields={extraFields}
        onSuccessPath="/profile/shelf"
        showDescription={false}
      />
    </Layout>
  );
}

export default ShelfUpdate;
