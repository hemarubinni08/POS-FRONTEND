import Layout from "../../components/Layout";
import CommonAdd from "../../components/CommonAdd";

function AddBrand() {

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

      <CommonAdd
        title="Brand"
        apiPath="brand"
        extraFields={extraFields}
        onSuccessPath="/dashboard/brand/list"
      />

    </Layout>

  );
}

export default AddBrand;