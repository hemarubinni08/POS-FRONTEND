"use client";

import React from "react";

import DynamicList from "../components/common/DynamicList";
import POSLayout from "../components/PosLayout";

function CustomerList() {
  const columns = [
    {
      key: "customerName",
      label: "Name",
      type: "text",
    },
    {
      key: "identifier",
      label: "Email",
      type: "text",
    },
    {
      key: "phoneNumber",
      label: "Phone",
      type: "text",
    },
    {
      key: "partyType",
      label: "Party Type",
      type: "text",
    },
    {
      key: "creditLimit",
      label: "Credit Limit",
      type: "text",
    },
    {
      key: "balance",
      label: "Balance",
      type: "text",
    },
  ];

  return (
    <POSLayout>
      <DynamicList
        title="Customer List"
        routeName="customer"
        columns={columns}
        editUrl="/customer/edit"
        addUrl="/customer/add"
      />
    </POSLayout>
  );
}

export default CustomerList;