import React from "react";
import CommonList from "../../components/ListPage5Col";

const WarehouseList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Warehouse", field: "identifier" },
    { label: "Location", field: "location" },
    { label: "Manager", field: "manager" },
    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Warehouse Management"
      columns={columns}
      urlName="warehouse"  
      showStatus={true}
    />
  );
};

export default WarehouseList;