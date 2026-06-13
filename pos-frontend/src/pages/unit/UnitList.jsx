import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const UnitList = () => {
  return (
    <Layout>
      <DataTable
        title="Unit Management"

        // ✅ API
        apiUrl="/api/unit/list"
        saveApi="/api/unit/add"
        deleteApi="/api/unit/delete"
        toggleApi="/api/unit/toggle" // ✅ important

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="identifier"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "Sl No", key: "id" },   // ✅ index
          { label: "Unit Name", key: "identifier" },
          
        ]}

        // ✅ FORM
        formFields={[
          {
            name: "identifier",
            label: "Unit Name",
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

export default UnitList;
