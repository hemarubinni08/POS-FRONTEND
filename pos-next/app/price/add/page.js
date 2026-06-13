"use client";

import CommonAddPage from "@/app/components/CommonAddPage";
import api from "@/app/services/api";

const dropdown = (label, name, apiUrl, extra = {}) => ({
  label,
  name,
  type: "dropdown",
  api: apiUrl,
  payload: {
    page: 0,
    sizePerPage: 100,
    sortField: "identifier",
    sortDirection: "ASC",
    status: true,
  },
  optionLabel: "identifier",
  optionValue: "identifier",
  placeholder: `Select ${label}`,
  ...extra,
});

export default function PriceAddPage() {

  const handleSubmit = async (data) => {
    console.log("Submitting Price:", data);

    try {
      const response = await api.post("/api/price/add", {
        product: data.product,
        priceAmount: Number(data.priceAmount),
        type: data.type,
        identifier: undefined,
        status: data.status === true || data.status === "true",
      });

      console.log(" PRICE RESPONSE:", response.data);

      const res = response.data;

      if (res.success === false) {
        alert(res.message);   
        return false;         
      }

    
      alert(res.message || " Price added successfully");
      return true;            

    } catch (error) {
      console.error("ERROR:", error);
      alert(" Server error");
      return false;
    }
  };

  return (
    <CommonAddPage
      title="Add Price"

      submitApi={handleSubmit}  

      redirectRoute="/price/list"

      initialValues={{
        product: "",
        priceAmount: "",
        type: "",
        status: true,
      }}

      fields={[
        dropdown(
          "Product",
          "product",
          "/api/product/findallactive"
        ),

        {
          label: "Price",
          name: "priceAmount",
          type: "number",
        },

        {
          label: "Price Type",
          name: "type",
          type: "dropdown",
          options: [
            { identifier: "MRP" },
            { identifier: "SELLING" },
          ],
          optionLabel: "identifier",
          optionValue: "identifier",
          placeholder: "Select Price Type",
        },
      ]}
    />
  );
}