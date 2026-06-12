import React from "react";
import Layout from "../../Component/Layout";
import ListTemplate from "../../Component/ListTemplate";

function ShelfList() {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    { label: "Status", field: "status" },
  ];

  return (
    <Layout>
      <ListTemplate
        title="Shelf Management"
        columns={columns}
        urlName="shelf"
        showStatus={true}
        editKey="identifier"
        addButtonLabel="Shelf"
        pageSize={3}
      />
    </Layout>
  );
}

export default ShelfList;
