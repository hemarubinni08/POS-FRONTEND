"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import POSLayout from "../../../components/PosLayout";
import SectionForm from "../../../components/common/SectionForm";
import commonApi from "../../../services/commonApi";

function WarehouseEdit() {
  const params = useParams();
  const identifier = params.identifier;

  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (identifier) {
      fetchWarehouse();
    }
  }, [identifier]);

  const fetchWarehouse = async () => {
    try {
      const res = await commonApi.get(
        "warehouse",
        "identifier",
        identifier
      );

      setInitialValues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!initialValues) {
    return <POSLayout>Loading...</POSLayout>;
  }

  const sections = [
    {
      title: "Basic Information",
      columns: 3,
      fields: [
        {
          key: "name",
          label: "Warehouse Name",
          type: "text",
          required: true,
        },
        {
          key: "identifier",
          label: "Warehouse Identifier",
          type: "text",
          required: true,
          disabled: true,
        },
        {
          key: "phoneNo",
          label: "Phone Number",
          type: "text",
          required: true,
          isPhone: true,
        },
      ],
    },
    {
      title: "Address Information",
      columns: 2,
      fields: [
        {
          key: "address",
          label: "Address",
          type: "text",
          required: true,
          fullWidth: true,
        },
        {
          key: "region",
          label: "Region",
          type: "text",
          required: true,
        },
        {
          key: "country",
          label: "Country",
          type: "text",
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
        title="Edit Warehouse"
        submitUrl="/warehouse/update"
        backUrl="/warehouse"
        sections={sections}
        initialValues={initialValues}
      />
    </POSLayout>
  );
}

export default WarehouseEdit;