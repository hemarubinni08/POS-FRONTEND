"use client";

import CommonAddPage from "@/app/components/CommonAddPage";
import api from "@/app/services/api";
import { createDropdownField } from "@/app/components/formFields";

export default function ProductAddPage() {

  const handleSubmit = async (data) => {
    console.log("Submitting:", data);

    try {
      const response = await api.post("/api/product/add", {
        identifier: data.identifier,
        category: data.category,
        brand: data.brand,
        model: data.model,
        unit: data.unit,
        quantity: Number(data.quantity) || 0,
        status: data.status === true || data.status === "true",
      });

      console.log("API RESPONSE 👉", response.data);

      if (response.data?.success === false) {
        alert(response.data.message);
        return false; 
      }

      alert(" Product added successfully");
      return true; 

    } catch (error) {
      console.error("ERROR 👉", error);
      alert("Server error");
      return false;
    }
  };

  const fields = [
    {
      label: "Identifier",
      name: "identifier",
      type: "text",
      placeholder: "Enter product code",
    },

    createDropdownField("Category", "category", "/api/category/list"),
    createDropdownField("Brand", "brand", "/api/brand/list"),
    createDropdownField("Model", "model", "/api/model/list"),
    createDropdownField("Unit", "unit", "/api/unit/list"),

    {
      label: "Quantity",
      name: "quantity",
      type: "number",
    },
    {
      label: "Status",
      name: "status",
      type: "radio",
      options: [
        { label: "Active", value: true },
        { label: "Inactive", value: false },
      ],
    },
  ];

  return (
    <CommonAddPage
      title="Add Product"
      submitApi={handleSubmit}
      redirectRoute="/product/list"
      initialValues={{
        identifier: "",
        category: "",
        brand: "",
        model: "",
        unit: "",
        quantity: 0,
        status: true,
      }}
      fields={fields}
    />
  );
}