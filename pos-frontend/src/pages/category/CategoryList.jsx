import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const CategoryList = () => {
  return (
    <Layout>
      <DataTable
        title="Category Management"

        // ✅ API (based on your backend)
        apiUrl="/api/category/list"
        saveApi="/api/category/add"
        deleteApi="/api/category/delete"
        basePath="/category"

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="identifier"
        showStatus={false}

        // ✅ TABLE COLUMNS (converted from JSP)
        columns={[
          { label: "ID", key: "id" },
          { label: "Category Name", key: "identifier" },
          { label: "Super Category", key: "superCategory" },
        ]}

        // ✅ FORM FIELDS (for add/edit)
        formFields={[
          {
            name: "identifier",
            label: "Category Name",
            type: "text",
          },
          {
            name: "superCategory",
            label: "Super Category",
            type: "text",
          },
        
        ]}
      />
    </Layout>
  );
};

export default CategoryList;