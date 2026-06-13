import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const ModelList = () => {
  return (
    <Layout>
      <DataTable
        title="Model Management"

        // ✅ API
        apiUrl="/api/model/list"
        saveApi="/api/model/add"
        deleteApi="/api/model/delete"
        toggleApi="/api/model/toggle"   // ✅ IMPORTANT (for switch)

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="identifier"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "Sl No", key: "id" },     // used as index
          { label: "Model Name", key: "identifier" },
        ]}

        // ✅ FORM
        formFields={[
          {
            name: "identifier",
            label: "Model Name",
            type: "text",
          },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "ACTIVE", value: true },
              { label: "INACTIVE", value: false },
            ],
          },
        ]}
      />
    </Layout>
  );
};

export default ModelList;