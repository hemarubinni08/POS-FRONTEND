import React from "react";
import CommonEditPage from "../../components/CommonEditPage";
import {
  ProductAPI,
  CategoryAPI,
  BrandAPI,
  ModelAPI,
  UnitAPI,
} from "../../api/api";

// ✅ pagination config
const pagination = {
  page: 0,
  sizePerPage: 50,
  sortDirection: "ASC",
  sortField: "identifier",
};

// ✅ dropdown helper
const dropdown = (label, name, api) => ({
  label,
  name,
  type: "dropdown",

  api, // ✅ API function
  payload: pagination,

  optionLabel: "identifier", // adjust if needed
  optionValue: "identifier",

  placeholder: `Select ${label}`,
});

const ProductEdit = () => {
  return (
    <CommonEditPage
      title="Edit Product"
      getApi={ProductAPI.get}
      updateApi={ProductAPI.update}
      redirectRoute="/product/list"
      idParam="identifier"
      submitButtonText="Update Product"

      // ✅ fallback values
      initialValues={{
        identifier: "",
        category: [], // ✅ MUST be array for multi-select
        brand: "",
        model: "",
        unit: "",
        quantity: "",
        status: true,
      }}

      fields={[
        // ✅ IDENTIFIER
        {
          label: "Identifier",
          name: "identifier",
          type: "text",
          disabledOnEdit: true,
        },

        // ✅ ✅ CATEGORY (MULTI SELECT)
        {
          ...dropdown("Category", "category", CategoryAPI.list),
          multiple: true, // ✅ IMPORTANT CHANGE
        },

        // ✅ OTHER DROPDOWNS (single select)
        dropdown("Brand", "brand", BrandAPI.list),
        dropdown("Model", "model", ModelAPI.list),
        dropdown("Unit", "unit", UnitAPI.list),

        // ✅ QUANTITY
        {
          label: "Quantity",
          name: "quantity",
          type: "number",
        },

        // ✅ STATUS
        {
          label: "Status",
          name: "status",
          type: "radio",
          options: [
            { label: "ACTIVE", value: true },
            { label: "INACTIVE", value: false },
          ],
        },
      ]}
    />
  );
};

export default ProductEdit;
