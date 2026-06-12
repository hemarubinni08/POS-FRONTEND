import React from "react";
import CommonList from "../../components/ListPage5Col";

const NodeList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    { label: "Path", field: "path" },

    {
      label: "Roles",
      render: (item) =>
        item.roles?.map((role, i) => (
          <span
            key={i}
            className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs mr-1"
          >
            {role}
          </span>
        )),
    },

   
    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Node Management"
      columns={columns}
      urlName="node"   
      showStatus={true} 
    />
  );
};

export default NodeList;