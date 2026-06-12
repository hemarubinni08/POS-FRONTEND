import React from "react";
import Layout from "../../Component/Layout";
import ListTemplate from "../../Component/ListTemplate";

function RacksList() {
  const columns = [
    { label: "ID", field: "id" },
    { label: "Identifier", field: "identifier" },
    {
      label: "Shelf",
      render: (item) =>
        item.shelf?.map((shelf) => (
          <span
            key={shelf}
            className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs mr-1"
          >
            {shelf}
          </span>
        )),
    },
    { label: "Status", field: "status" },
  ];

  return (
    <Layout>
      <ListTemplate
        title="Racks Management"
        columns={columns}
        urlName="racks"
        showStatus={true}
        editKey="id"
        addButtonLabel="Racks"
        pageSize={2}
      />
    </Layout>
  );
}

export default RacksList;
