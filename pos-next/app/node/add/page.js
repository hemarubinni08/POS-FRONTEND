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

export default function NodeAddPage() {

  const handleSubmit = async (data) => {
    console.log("Submitting Node:", data);

    try {
      const response = await api.post("/api/node/add", {
        ...data,
        status: data.status === true || data.status === "true",
      });

      console.log(" NODE RESPONSE:", response.data);

      const res = response.data;

      if (res.success === false) {
        alert(res.message);   
        return false;         
      }


      alert(res.message || " Node added successfully");
      return true;        

    } catch (error) {
      console.error("ERROR:", error);
      alert(" Server error");
      return false;
    }
  };

  return (
    <CommonAddPage
      title="Add Node"

      submitApi={handleSubmit}   

      redirectRoute="/node/list"

      initialValues={{
        identifier: "",
        path: "",
        roles: [],
        status: true,
      }}

      fields={[
        { label: "Identifier", name: "identifier", type: "text" },

        {
          label: "Path",
          name: "path",
          type: "text",
          placeholder: "Enter node path",
        },

        dropdown("Roles", "roles", "/api/role/list", {
          multiple: true,
        }),
      ]}
    />
  );
}