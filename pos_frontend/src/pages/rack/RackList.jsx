import React from "react";
import CommonList from "../../components/ListPage5Col";

const RackList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Rack", field: "identifier" },

    {
      label: "Shelves",
      render: (item) =>
        item.shelfs?.map((shelf, i) => (
          <span
            key={i}
            className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs mr-1"
          >
            {shelf}
          </span>
        )),
    },

    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Rack Management"
      columns={columns}
      urlName="rack"   
      showStatus={true}
    />
  );
};

export default RackList;