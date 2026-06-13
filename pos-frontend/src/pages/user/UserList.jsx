import React from "react";
import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const UserList = () => {
  return (
    <Layout>
      <DataTable
        title="User Management"

        // ✅ API ENDPOINTS (match backend exactly)
        apiUrl="/api/user/list"
        saveApi="/api/user/register"   // ✅ FIXED (was /add)
        deleteApi="/api/user/delete"

        // ✅ ROLE ACCESS
        userRole="ADMIN"
        roles={["ADMIN"]}
        showStatus={false}

        // ✅ PRIMARY KEY (matches backend)
        idField="username"

        // ✅ TABLE COLUMNS
        columns={[
          { label: "Email", key: "username" },
          { label: "Name", key: "name" },
          { label: "Phone", key: "phoneNo" },
          { label: "Roles", key: "roles" },
        ]}

        // ✅ FORM CONFIG
        formFields={[
          {
            name: "username",
            label: "Email",
            type: "text",
            required: true,
          },
          {
            name: "name",
            label: "Name",
            type: "text",
          },
          {
            name: "phoneNo",
            label: "Phone",
            type: "text",
          },
          {
            name: "roles",
            label: "Roles (comma separated)",
            type: "text",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
          }
        ]}

        // ✅ PAGINATION DEFAULT (important)
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

export default UserList;
