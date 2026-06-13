import React from "react";
import CommonListPage from "../../components/CommonListPage";

const ProductList = () => {
  return (
    <CommonListPage
      title="Product Management"

      apiUrl="/product/list"
      method="POST"

      deleteApi="/product/delete"
      deleteParam="identifier"

      editRoute="/product/edit/:identifier"
      addRoute="/product/add"

      showStatus={true}
      toggleApi="/product/toggle-status "
      toggleParam="identifier"
      toggleField="status"
      toggleMethod="POST"

      columns={[
        { header: "ID", field: "id" },
        { header: "Identifier", field: "identifier" },
        { header: "Category", field: "category" },
        { header: "Brand", field: "brand" },
        { header: "Model", field: "model" },
        { header: "Unit", field: "unit" },
        { header: "Quantity", field: "quantity" },
        { header: "Status", field: "status" },
      ]}
    />
  );
};

export default ProductList;