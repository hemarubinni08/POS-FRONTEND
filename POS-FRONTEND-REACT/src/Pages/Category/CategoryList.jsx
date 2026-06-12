import React from "react";
import Layout from "../../Component/Layout";
import ListTemplate from "../../Component/ListTemplate";

function CategoryList() {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    { label: "Supercategory", field: "supercategory" },
    { label: "Status", field: "status" },
  ];

  return (
    <Layout>
      <ListTemplate
        title="Category Management"
        columns={columns}
        urlName="category"
        showStatus={true}
        editKey="id"
        addButtonLabel="Category"
        pageSize={5}
      />
    </Layout>
  );
}

export default CategoryList;
