import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const ShelfList = () => {
  return (
    <Layout>
      <DataTable
        title="Shelf Management"

        // ✅ API
        apiUrl="/api/shelf/list"
        saveApi="/api/shelf/add"
        deleteApi="/api/shelf/delete"
        toggleApi="/api/shelf/toggle"   // ✅ important

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="identifier"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "ID", key: "id" },
          { label: "Shelf Name", key: "identifier" },
         
        ]}

        // ✅ FORM
        formFields={[
          {
            name: "identifier",
            label: "Shelf Name",
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

export default ShelfList;