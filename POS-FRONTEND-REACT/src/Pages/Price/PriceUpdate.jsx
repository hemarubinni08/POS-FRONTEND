import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import CommonUpdateTemplate from "../../Component/CommonUpdateTemplate";

function PriceUpdate() {
  const { id } = useParams();

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
      <CommonUpdateTemplate
        title="Price"
        apiPath="price"
        recordId={id}
        recordParam="id"
        extraFields={extraFields}
        onSuccessPath="/profile/price"
        showDescription={false}
      />
    </Layout>
  );
}

export default PriceUpdate;
