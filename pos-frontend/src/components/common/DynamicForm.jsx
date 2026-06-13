import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const DynamicForm = ({
  title,
  fields = [],
  saveApi,
  updateApi,
  initialData = {},
  idField = "id",
  redirectUrl = "/",
}) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name.includes(".")) {
    const keys = name.split(".");

    setFormData((prev) => {
      let updated = { ...prev };
      let temp = updated;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          temp[key] = temp[key] || {};
          temp = temp[key];
        }
      });

      return updated;
    });
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (formData[idField]) {
        await api.post(updateApi, formData);
      } else {
        await api.post(saveApi, formData);
      }

      navigate(redirectUrl);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };
  const getValue = (obj, path) => {
  return path.split(".").reduce((o, key) => o?.[key], obj) ?? "";
};

  return (
    <div className="text-gray-800">

      {/* ✅ HEADER */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">
          Fill the details below
        </p>
      </div>

      {/* ✅ FORM CARD */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 max-w-xl mx-auto">

        {/* ✅ ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* ✅ FIELDS */}
          {fields.map((field, index) => (
            <div key={index}>

              <label className="block text-sm font-medium mb-1 text-gray-700">
                {field.label}
              </label>

              {/* ✅ TEXTAREA */}
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  rows={3}
                  disabled={field.disabled}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              ) : field.type === "select" ? (

                /* ✅ SELECT */
                <select
                  name={field.name}
                  value={formData[field.name] ?? ""}
                  onChange={handleChange}
                  disabled={field.disabled}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 
                  bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {field.options?.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

              ) : (

                /* ✅ INPUT */
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={getValue(formData, field.name)}
                  onChange={handleChange}
                  disabled={field.disabled}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              {/* ✅ HELPER TEXT */}
              {field.helper && (
                <p className="text-xs text-gray-500 mt-1">
                  {field.helper}
                </p>
              )}

            </div>
          ))}

          {/* ✅ ACTION BUTTONS */}
          <div className="flex justify-end gap-3 mt-6">

            {/* CANCEL */}
            <button
              type="button"
              onClick={() => navigate(redirectUrl)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 
              hover:bg-gray-100"
            >
              Cancel
            </button>

            {/* SAVE */}
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white 
              bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900
              hover:from-blue-900 hover:to-indigo-800 transition-all duration-300"
            >
              💾 {formData[idField] ? "Update" : "Save"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default DynamicForm;