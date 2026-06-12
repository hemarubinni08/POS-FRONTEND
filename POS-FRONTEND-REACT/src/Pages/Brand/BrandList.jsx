import React from "react";
import Layout from "../../Component/Layout";
import ListTemplate from "../../Component/ListTemplate";

function BrandList() {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    { label: "Status", field: "status" },
  ];

  return (
    <Layout>
      <ListTemplate
        title="Brand Management"
        columns={columns}
        urlName="brand"
        showStatus={true}
        editKey="identifier"
        addButtonLabel="Brand"
        pageSize={4}
      />
    </Layout>
  );
}

export default BrandList;
