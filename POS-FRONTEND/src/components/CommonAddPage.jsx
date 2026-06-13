import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonDropDown from "./CommonDropDown";

const CommonAddPage = ({
  title = "Add Record",
  submitApi,
  redirectRoute,
  fields = [],
  initialValues = {},
  submitButtonText = "Save",
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "true" : value,
    }));

    // ✅ remove field error
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ ✅ FIXED VALIDATION (supports multi-select)
  const validateForm = () => {
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      // ✅ MULTI SELECT (ARRAY)
      if (field.type === "dropdown" && field.multiple) {
        if (!Array.isArray(value) || value.length === 0) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }

      // ✅ OTHER FIELDS
      else if (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "string" && value.trim() === "")
      ) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      console.log("Submitting data:", formData); // ✅ DEBUG

      if (typeof submitApi === "function") {
        await submitApi(formData);
      } else {
        await axios.post(submitApi, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      navigate(redirectRoute);

    } catch (err) {
      console.error("SAVE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIELD RENDER
  const renderField = (field) => {
    const value =
      formData[field.name] ??
      (field.multiple ? [] : ""); // ✅ FIXED

    const fieldError = errors[field.name];

    const baseClass = `w-full rounded-lg px-3 py-2 text-sm border
      ${fieldError ? "border-red-500" : "border-slate-300"}
      focus:outline-none focus:ring-2 focus:ring-blue-500`;

    // ✅ INPUT TYPES
    if (["text", "number", "email", "date"].includes(field.type)) {
      return (
        <>
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={baseClass}
          />
          {fieldError && (
            <p className="text-red-500 text-xs mt-1">{fieldError}</p>
          )}
        </>
      );
    }

    // ✅ TEXTAREA
    if (field.type === "textarea") {
      return (
        <>
          <textarea
            name={field.name}
            value={value}
            onChange={handleChange}
            rows={4}
            placeholder={field.placeholder}
            className={baseClass}
          />
          {fieldError && (
            <p className="text-red-500 text-xs mt-1">{fieldError}</p>
          )}
        </>
      );
    }

    // ✅ SELECT
    if (field.type === "select") {
      return (
        <>
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            className={baseClass}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {fieldError && (
            <p className="text-red-500 text-xs mt-1">{fieldError}</p>
          )}
        </>
      );
    }

    // ✅ DROPDOWN (supports multi-select)
    if (field.type === "dropdown") {
      return (
        <>
          <CommonDropDown
            {...field}
            value={value}
            onChange={handleChange}
          />
          {fieldError && (
            <p className="text-red-500 text-xs mt-1">{fieldError}</p>
          )}
        </>
      );
    }

    // ✅ RADIO
    if (field.type === "radio") {
      return (
        <>
          <div className="flex gap-4 flex-wrap">
            {field.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={field.name}
                  value={opt.value}
                  checked={String(value) === String(opt.value)}
                  onChange={handleChange}
                />
                {opt.label}
              </label>
            ))}
          </div>
          {fieldError && (
            <p className="text-red-500 text-xs mt-1">{fieldError}</p>
          )}
        </>
      );
    }

    return null;
  };

  // ✅ UI
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-slate-200">

        {/* HEADER */}
        <div className="px-6 py-4 border-b bg-slate-900 rounded-t-2xl">
          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="space-y-4">
            {fields.map((field, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {field.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>

                {renderField(field)}
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate(redirectRoute)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
              {loading ? "Saving..." : submitButtonText}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CommonAddPage;
