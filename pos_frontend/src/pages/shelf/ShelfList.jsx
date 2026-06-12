import React from "react";
import CommonList from "../../components/ListPage5Col";

const ShelfList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Shelf", field: "identifier" },
    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Shelf Management"
      columns={columns}
      urlName="shelf"   
      showStatus={true}
    />
  );
};

export default ShelfList;