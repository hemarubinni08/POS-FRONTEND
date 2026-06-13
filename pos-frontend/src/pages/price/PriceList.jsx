import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const PriceList = () => {
  return (
    <Layout>
      <DataTable
        title="Price Management"

        // ✅ API
        apiUrl="/api/price/list"
        saveApi="/api/price/add"
        deleteApi="/api/price/delete"

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
          { label: "Product", key: "product" },
          { label: "Price", key: "price" },
          { label: "Price Type", key: "type" },
        ]}

        // ✅ FORM
        formFields={[
          {
            name: "identifier",
            label: "Identifier",
            type: "text",
          },
          {
            name: "product",
            label: "Product",
            type: "text",
          },
          {
            name: "price",
            label: "Price",
            type: "number",
          },
          {
            name: "type",
            label: "Price Type",
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

export default PriceList;