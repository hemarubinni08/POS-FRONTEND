import React from "react";

import DynamicList from "../../components/common/DynamicList";

import POSLayout from "../../components/POSLayout";

function StockList() {

  const columns = [
    {
      key: "identifier",
      label: "Stock Identifier",
      type: "text",
    },
    {
      key: "product",
      label: "Product",
      type: "text",
    },
    {
      key: "warehouse",
      label: "Warehouse",
      type: "text",
    },
    {
      key: "minimumStock",
      label: "Minimum Stock",
      type: "text",
    },
    {
      key: "quantity",
      label: "Quantity",
      type: "text",
    },
    {
      key: "status",
      label: "Status",
      type: "stockStatus",
    },
  ];

  return (
    <POSLayout>
      <DynamicList
        title="Stock List"
        routeName="stock"
        columns={columns}
        addUrl="/stock/add"
        editUrl="/stock/edit"
      />
    </POSLayout>
  );
}

export default StockList;