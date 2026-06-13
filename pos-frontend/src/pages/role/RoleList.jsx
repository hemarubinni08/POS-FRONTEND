import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const RoleList = () => {
  return (
    <Layout>
      <DataTable
        title="Role Management"

        // ✅ API
        apiUrl="/api/role/list"
        saveApi="/api/role/add"
        deleteApi="/api/role/delete"

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}
        showStatus={false}

        // ✅ PRIMARY KEY
        idField="identifier"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "ID", key: "id" },
          { label: "Role", key: "identifier" },
          { label: "Description", key: "description" },
        ]}

        // ✅ FORM FIELDS
        formFields={[
          {
            name: "identifier",
            label: "Role",
            type: "text",
          },
          {
            name: "description",
            label: "Description",
            type: "text",
          },
          
        ]}
      />
    </Layout>
  );
};

export default RoleList;