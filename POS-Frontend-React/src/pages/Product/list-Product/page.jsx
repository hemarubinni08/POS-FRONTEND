import React from "react";
import CommonList from "../../../components/CommonList";
import Layout from "../../../components/Layout";
 
const ProductList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "SKU", field: "identifier" },
 
    {
  label: "category",
  render: (item) => {
    const categories = Array.isArray(item.category)
      ? item.category
      : item.category
      ? String(item.category).split(",").filter(Boolean)
      : [];

    return categories.map((c, i) => (
      <span
        key={i}
        className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs mr-1"
      >
        {c}
      </span>
    ));
  }
},
    
    { label: "Brand", field: "brand" },
    { label: "Model", field: "models" },
    { label: "Name", field: "productName" },
    { label: "Status", field: "status" },
  ];
 
  return (
    <Layout>
       <CommonList
      title="Product Management"
      columns={columns}
      urlName="product"
      showStatus={true} 
    />
    </Layout>
   
  );
};
export default ProductList;
