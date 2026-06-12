import React from "react";
import CommonList from "../../components/ListPage5Col";

const ModelList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Model", field: "identifier" },
    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Model Management"
      columns={columns}
      urlName="model"  
      showStatus={true}
    />
  );
};

export default ModelList;