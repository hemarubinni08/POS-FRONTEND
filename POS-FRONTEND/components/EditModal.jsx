import React from "react";

const EditModal = ({
  formData,
  handleChange,
}) => {

  const editableFields = [
    "identifier",
    "name",
    "description",
  ];

  return (
    <div className="space-y-4">
      {editableFields.map((key) => (
        <div key={key}>
          <label className="block mb-1 font-medium">
            {key}
          </label>

          <input
            type="text"
            name={key}
            value={formData[key] || ""}
            onChange={handleChange}
            readOnly={key === "identifier"}
            className={`w-full border rounded-lg px-3 py-2 ${
              key === "identifier"
                ? "bg-gray-100 cursor-not-allowed"
                : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default EditModal;