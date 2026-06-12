import React from "react";
import ListTemplate from "../../Component/ListTemplate";
import Layout from "../../Component/Layout";

const ProductList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "SKU", field: "identifier" },
    { label: "Description", field: "description" },
    {
      label: "Category",
      render: (item) =>
        item.category?.map((category) => (
          <span
            key={category}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs mr-1"
          >
            {category}
          </span>
        )),
    },
    { label: "Brand", field: "brand" },
    { label: "Model", field: "model" },
    { label: "Name", field: "productName" },
    { label: "Status", field: "status" },
  ];

  return (
    <Layout>
      <ListTemplate
        title="Product Management"
        columns={columns}
        urlName="product"
        showStatus={true}
        editKey="id"
        addButtonLabel="Product"
        pageSize={3}
      />
    </Layout>
  );
};

export default ProductList;
