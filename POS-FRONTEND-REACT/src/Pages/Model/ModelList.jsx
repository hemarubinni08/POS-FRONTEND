import React from "react";
import Layout from "../../Component/Layout";
import ListTemplate from "../../Component/ListTemplate";

function ModelList() {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    { label: "Status", field: "status" },
  ];

  return (
    <Layout>
      <ListTemplate
        title="Model Management"
        columns={columns}
        urlName="models"
        showStatus={true}
        editKey="identifier"
        addButtonLabel="Model"
        pageSize={1}
      />
    </Layout>
  );
}

export default ModelList;
