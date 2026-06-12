import Layout from "../../components/Layout";
import CommonEdit from "../../components/CommonEdit";

function EditBrand() {

  const extraFields = [

    {
      key: "status",
      label: "Status",
      type: "select",
      valueType: "boolean",
      required: true,
      options: [
        {
          label: "Active",
          value: "true",
        },
        {
          label: "Inactive",
          value: "false",
        },
      ],
    },

  ];

  return (

    <Layout>

      <CommonEdit
        title="Brand"
        apiPath="brand"
        extraFields={extraFields}
        onSuccessPath="/dashboard/brand/list"
      />

    </Layout>

  );
}

export default EditBrand;