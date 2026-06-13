import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const StockList = () => {
  return (
    <Layout>
      <DataTable
        title="Stock Management"

        // ✅ API
        apiUrl="/api/stock/list"
        saveApi="/api/stock/add"
        deleteApi="/api/stock/delete"
        toggleApi="/api/stock/toggle"   // ✅ ADD THIS (IMPORTANT)

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="id"

        // ✅ SHOW STATUS
        showStatus={true}   // ✅ ensure it's enabled

        // ✅ TABLE COLUMNS
        columns={[
          { label: "ID", key: "id" },
          { label: "Product", key: "productIdentifier" },
          { label: "Warehouse", key: "warehouseIdentifier" },
          { label: "Quantity", key: "quantity" },
          { label: "Min Stock", key: "minimumStock" },
        ]}

        // ✅ FORM
        formFields={[
          {
            name: "productIdentifier",
            label: "Product",
            type: "text",
          },
          {
            name: "warehouseIdentifier",
            label: "Warehouse",
            type: "text",
          },
          {
            name: "quantity",
            label: "Quantity",
            type: "number",
          },
          {
            name: "minimumStock",
            label: "Minimum Stock",
            type: "number",
          },
          {
            name: "status",   // ✅ ADD THIS FIELD (IMPORTANT)
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

export default StockList;
