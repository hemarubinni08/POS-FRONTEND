import React from "react";
import Layout from "../../Component/Layout";
import ListTemplate from "../../Component/ListTemplate";

function PriceList() {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    { label: "Value", field: "value" },
    { label: "Status", field: "status" },
  ];

  return (
    <Layout>
      <ListTemplate
        title="Price Management"
        columns={columns}
        urlName="price"
        showStatus={true}
        editKey="id"
        deleteKey="identifier"
        deleteParam="identifier"
        addButtonLabel="Price"
        pageSize={4}
      />
    </Layout>
  );
}

export default PriceList;
