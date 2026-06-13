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
  },
  optionLabel: "identifier",
  optionValue: "identifier",
  placeholder: `Select ${label}`,
  ...extra,
});

export default function CategoryAddPage() {

  const handleSubmit = async (data) => {
    try {
      const response = await api.post("/api/category/add", {
        ...data,
        status: data.status === true || data.status === "true",
      });

      console.log(" CATEGORY RESPONSE:", response.data);

      const res = response.data;

      if (res.success === false) {
        alert(res.message);
        return false;       
      }

      alert(res.message || " Category added successfully");
      return true;           

    } catch (error) {
      console.error("ERROR:", error);
      alert(" Server error");
      return false;
    }
  };

  return (
    <CommonAddPage
      title="Add Category"

      submitApi={handleSubmit}  

      redirectRoute="/category/list"

      initialValues={{
        identifier: "",
        superCategory: "",
      }}

      fields={[
        {
          label: "Identifier",
          name: "identifier",
          type: "text",
        },

        dropdown(
          "Super Category",
          "superCategory",
          "/api/category/list",
          { includeNoneOption: true }
        ),
      ]}
    />
  );
}