import React from "react";
import CommonList from "../../components/ListPage5Col";

const PriceList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    { label: "Effective From", field: "effectiveFrom" },
    { label: "MRP", field: "mrp" },
    { label: "Selling Price", field: "sellingPrice" },
    { label: "Cost Price", field: "costPrice" },
    { label: "Product", field: "productIdentifier" },
    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Price Management"
      columns={columns}
      urlName="price"  
      showStatus={true}
    />
  );
};

export default PriceList;