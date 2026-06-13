import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const ProductList = () => {
  return (
    <Layout>
      <DataTable
        title="Product Management"

        // ✅ API
        apiUrl="/api/product/list"
        saveApi="/api/product/add"
        deleteApi="/api/product/delete"
        toggleApi="/api/product/toggle"
        basePath="/product"

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="identifier"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "ID", key: "id" },
          { label: "Identifier", key: "identifier" },
          { label: "Category", key: "category" },
          { label: "Brand", key: "brand" },
          { label: "Model", key: "model" },
          { label: "Unit", key: "unit" },
        ]}

        // ✅ ✅ THIS IS YOUR JSP FORM CONVERTED TO REACT
        formFields={[
          {
            name: "identifier",
            label: "Product Identifier",
            type: "text",
          },
          {
            name: "category",
            label: "Category",
            type: "text",
          },
          {
            name: "brand",
            label: "Brand",
            type: "text",
          },
          {
            name: "model",
            label: "Model",
            type: "text",
          },
          {
            name: "unit",
            label: "Unit",
            type: "text",
          },
          {
            name: "quantity",
            label: "Quantity",
            type: "number",
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

export default ProductList;
