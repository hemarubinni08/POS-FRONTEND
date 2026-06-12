import React from "react";
import CommonList from "../../components/ListPage5Col";

const StockList = () => {
  const columns = [
    { label: "ID", field: "id" },
    { label: "  Identifier", field: "identifier" },
    { label: "Product", field: "productIdentifier" },
    { label: "Warehouse", field: "warehouseIdentifier" },

    // ✅ YOUR CODE (placed correctly)
    {
      label: "Quantity",
      render: (item) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            item.quantity <= item.minimumStock
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {item.quantity}
        </span>
      ),
    },

    { label: "Min Stock", field: "minimumStock" },
    { label: "Status", field: "status" },
  ];

  return (
    <CommonList
      title="Stock Management"
      columns={columns}
      urlName="stock"
      showStatus={true}
    />
  );
};

export default StockList;