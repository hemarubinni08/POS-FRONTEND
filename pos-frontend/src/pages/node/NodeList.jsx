import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const NodeList = () => {
  return (
    <Layout>
      <DataTable
        title="Node Management"

        // ✅ API
        apiUrl="/api/node/list"
        saveApi="/api/node/add"
        deleteApi="/api/node/delete"

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}
        showStatus={false}

        // ✅ PRIMARY KEY
        idField="identifier"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "ID", key: "id" },
          { label: "Identifier", key: "identifier" },
          { label: "Path", key: "path" },
          { label: "Roles", key: "roles" }, // ✅ special handling
        ]}

        // ✅ FORM FIELDS
        formFields={[
          {
            name: "identifier",
            label: "Identifier",
            type: "text",
          },
          {
            name: "path",
            label: "Path",
            type: "text",
          },
          {
            name: "roles",
            label: "Roles (comma separated)",
            type: "text",
          },
         
        ]}
      />
    </Layout>
  );
};

export default NodeList;
