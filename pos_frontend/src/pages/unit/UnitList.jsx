import React from "react";
import CommonList from "../../components/ListPage5Col";

const UnitList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Unit", field: "identifier" },
    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Unit Management"
      columns={columns}
      urlName="unit"    
      showStatus={true}
    />
  );
};

export default UnitList;