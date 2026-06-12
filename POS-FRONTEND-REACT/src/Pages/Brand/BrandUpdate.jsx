import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import CommonUpdateTemplate from "../../Component/CommonUpdateTemplate";

function BrandUpdate() {
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
        title="Brand"
        apiPath="brand"
        recordId={identifier}
        recordParam="identifier"
        extraFields={extraFields}
        onSuccessPath="/profile/brand"
        showDescription={false}
      />
    </Layout>
  );
}

export default BrandUpdate;
