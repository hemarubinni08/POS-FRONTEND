import React from "react";
import CommonAddPage from "../../components/CommonAddPage";

import {
  ProductAPI,
  CategoryAPI,
  BrandAPI,
  ModelAPI,
  UnitAPI
} from "../../api/api";

// ✅ COMMON DROPDOWN BUILDER
const dropdown = (label, name, apiFn, extra = {}) => ({
  label,
  name,
  type: "dropdown",

  api: apiFn,

  payload: {
    page: 0,
    sizePerPage: 100,
    sortField: "identifier",
    sortDirection: "ASC"
  },

  optionLabel: "identifier",
  optionValue: "identifier",

  placeholder: `-- Select ${label} --`,

  ...extra   // ✅ allow override (like multiple)
});

const ProductAdd = () => {
  return (
    <CommonAddPage
      title="Add Product"
      submitApi={ProductAPI.add}
      redirectRoute="/product/list"
      submitButtonText="Save Product"

      // ✅ IMPORTANT: category is ARRAY
      initialValues={{
        identifier: "",
        category: [],   // ✅ MULTI SELECT
        brand: "",
        model: "",
        unit: "",
        quantity: "",
        status: true
      }}

      fields={[

        // ✅ IDENTIFIER
        {
          label: "Identifier",
          name: "identifier",
          type: "text",
          placeholder: "Enter Product Identifier",
        },

        // ✅ CATEGORY (MULTI SELECT ✅)
        dropdown(
          "Category",
          "category",
          CategoryAPI.list,
          {
            multiple: true   // ✅ THIS ENABLES MULTI SELECT
          }
        ),

        // ✅ BRAND
        dropdown(
          "Brand",
          "brand",
          BrandAPI.list
        ),

        // ✅ MODEL
        dropdown(
          "Model",
          "model",
          ModelAPI.list
        ),

        // ✅ UNIT
        dropdown(
          "Unit",
          "unit",
          UnitAPI.list
        ),

        // ✅ QUANTITY
        {
          label: "Quantity",
          name: "quantity",
          type: "number",
          placeholder: "Enter Quantity",
        },

        // ✅ STATUS
        {
          label: "Status",
          name: "status",
          type: "radio",
          options: [
            { label: "ACTIVE", value: true },
            { label: "INACTIVE", value: false }
          ]
        }
      ]}
    />
  );
};

export default ProductAdd;