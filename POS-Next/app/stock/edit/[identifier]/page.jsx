"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import POSLayout from "../../../components/PosLayout";
import SectionForm from "../../../components/common/SectionForm";
import commonApi from "../../../services/commonApi";

function StockEdit() {
  const params = useParams();
  const identifier = params.identifier;

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (identifier) {
      fetchStock();
    }
  }, [identifier]);

  const fetchStock = async () => {
    try {
      console.log("Identifier:", identifier);

      const res = await commonApi.get("stock", "identifier", identifier);

      setInitialValues(res.data);
    } catch (err) {
      console.log("ERROR:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log("URL:", err.config?.url);
    }
  };

  if (!initialValues) {
    return <POSLayout>Loading...</POSLayout>;
  }

  const sections = [
    {
      title: "Stock Information",
      columns: 2,
      fields: [
        {
          key: "identifier",
          label: "Stock Identifier",
          type: "text",
          disabled: true,
          required: true,
        },
        {
          key: "product",
          label: "Product",
          type: "text",
          disabled: true,
          required: true,
        },
        {
          key: "warehouse",
          label: "Warehouse",
          type: "text",
          disabled: true,
          required: true,
        },
        {
          key: "minimumStock",
          label: "Minimum Stock",
          type: "number",
          required: true,
        },
        {
          key: "quantity",
          label: "Quantity",
          type: "number",
          required: true,
        },
        {
    key: "createdBy",
    label: "Created By",
    type: "text",
    required: false,
  },
  {
    key: "createdOn",
    label: "Created On",
    type: "text",
    required: false,
  },
  {
    key: "modifiedBy",
    label: "Modified By",
    type: "text",
    required: false,
  },
  {
    key: "modifiedOn",
    label: "Modified On",
    type: "text",
    required: false,
  },
      ],
    },
  ];

  return (
    <POSLayout>
      <SectionForm
        title="Edit Stock"
        submitUrl="/stock/update"
        backUrl="/stock"
        sections={sections}
        initialValues={initialValues}
      />
    </POSLayout>
  );
}

export default StockEdit;