import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const BrandList = () => {
  return (
    <Layout>
      <DataTable
        title="Brand Management"

        // ✅ API (based on your JSP)
        apiUrl="/api/brand/list"
        saveApi="/api/brand/add"
        deleteApi="/api/brand/delete"
        basePath="/brand"

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="identifier"
        showStatus={false}

        // ✅ TABLE COLUMNS (converted from JSP)
        columns={[
          { label: "ID", key: "id" },
          { label: "Brand Name", key: "identifier" },
          { label: "Description", key: "description" },
        ]}

        // ✅ FORM (converted from JSP form idea)
        formFields={[
          {
            name: "identifier",
            label: "Brand Name",
            type: "text",
          },
          {
            name: "description",
            label: "Description",
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

export default BrandList;
