import React from "react";
import CommonList from "../../components/CommonList";
import Layout from "../../components/Layout";

const BrandList = () => {

  const columns = [

    {
      label: "ID",
      field: "id",
    },

    {
      label: "Identifier",
      field: "identifier",
    },

    {
      label: "Description",
      field: "description",
    },

    {
      label: "Status",
      field: "status",
    },

  ];

  return (
    <Layout>
      <CommonList
        title="Brand Management"
        columns={columns}
        urlName="brand"
        showStatus={true}
      />
    </Layout>
  );
};

export default BrandList;
