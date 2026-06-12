import Layout from "../../Component/Layout";
import CommonAddTemplate from "../../Component/CommonAddTemplate";

function CategoryAdd() {
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
      <CommonAddTemplate
        title="Category"
        apiPath="category"
        extraFields={extraFields}
        onSuccessPath="/profile/category"
        showDescription={false}
      />
    </Layout>
  );
}

export default CategoryAdd;
