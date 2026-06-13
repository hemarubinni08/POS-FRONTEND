import React from "react";
import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const WarehouseList = () => {
  return (
    <Layout>
      <DataTable
        title="Warehouse Management"

        // ✅ API
        apiUrl="/api/warehouse/list"
        saveApi="/api/warehouse/add"
        deleteApi="/api/warehouse/delete"
        toggleApi="/api/warehouse/toggle" 
        basePath="/warehouse" // ✅ toggle support

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}

        // ✅ PRIMARY KEY
        idField="identifier"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "ID", key: "id" },
          { label: "Name", key: "identifier" },
          { label: "Location", key: "location" },
          { label: "Capacity", key: "capacity" },
        ]}

        // ✅ FORM
        formFields={[
          {
            name: "identifier",
            label: "Warehouse Name",
            type: "text",
          },
          {
            name: "location",
            label: "Location",
            type: "text",
          },
          {
            name: "capacity",
            label: "Capacity",
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
         defaultPagination={{
          page: 0,          // backend uses 0-based
          sizePerPage: 5
        }}

        // ✅ ENABLE PAGINATION UI
        enablePagination={true}
      />
    </Layout>
  );
};

export default WarehouseList;