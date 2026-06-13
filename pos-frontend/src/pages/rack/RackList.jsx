import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const RackList = () => {
  return (
    <Layout>
      <DataTable
        title="Rack Management"

        // ✅ API
        apiUrl="/api/racks/list"
        saveApi="/api/racks/add"
        deleteApi="/api/racks/delete"
        toggleApi="/api/racks/toggle"   // ✅ toggle support

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="identifier"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "ID", key: "id" },
          { label: "Rack Name", key: "identifier" },
          { label: "Shelf", key: "shelfIdentifier" },
          // handled specially
        ]}

        // ✅ FORM
        formFields={[
          {
            name: "identifier",
            label: "Rack Name",
            type: "text",
          },
          {
            name: "shelfIdentifier",
            label: "Shelf",
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

export default RackList;