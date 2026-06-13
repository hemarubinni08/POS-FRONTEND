import Layout from "../../components/layout/Layout";
import DataTable from "../../components/common/DataTable";

const CustomerList = () => {
  return (
    <Layout>
      <DataTable
        title="Customer Management"

        // ✅ API
        apiUrl="/api/customer/list"
        saveApi="/api/customer/add"
        deleteApi="/api/customer/delete"
        basePath="/customer"

        // ✅ ROLE
        userRole="ADMIN"
        roles={["ADMIN"]}
        showStatus={false}

        // ✅ PRIMARY KEY (phoneNo used in JSP)
        idField="phoneNo"

        // ✅ TABLE COLUMNS (converted from JSP)
        columns={[
          { label: "#", key: "id" }, // optional numbering if backend supports
          { label: "Customer Name", key: "customerName" },
          { label: "Phone", key: "phoneNo" },
          { label: "Party Type", key: "partyType" },
          { label: "Credit Type", key: "creditType" },
          { label: "Credit", key: "credit" },
          { label: "Credit Limit", key: "creditLimit" },
        ]}

        // ✅ FORM FIELDS
        formFields={[
          {
            name: "customerName",
            label: "Customer Name",
            type: "text",
          },
          {
            name: "phoneNo",
            label: "Phone Number",
            type: "text",
          },
          {
            name: "partyType",
            label: "Party Type",
            type: "text",
          },
          {
            name: "creditType",
            label: "Credit Type",
            type: "text",
          },
          {
            name: "credit",
            label: "Credit",
            type: "number",
          },
          {
            name: "creditLimit",
            label: "Credit Limit",
            type: "number",
          },
        ]}
      />
    </Layout>
  );
};

export default CustomerList;
