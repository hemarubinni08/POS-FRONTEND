import { useParams } from "react-router-dom";
import Layout from "../../Component/Layout";
import CommonUpdateTemplate from "../../Component/CommonUpdateTemplate";

function CategoryUpdate() {
  const { id } = useParams();

  const extraFields = [
    {
      key: "supercategory",
      label: "Supercategory",
      type: "select",
      apiPath: "category",
      required: false,
      placeholder: "None (Top-level category)",
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
        title="Category"
        apiPath="category"
        recordId={id}
        recordParam="id"
        extraFields={extraFields}
        onSuccessPath="/profile/category"
        showDescription={false}
      />
    </Layout>
  );
}

export default CategoryUpdate;
