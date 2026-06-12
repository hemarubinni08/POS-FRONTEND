import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from "../components/axiosInstance";

import SingleSelectDropdown from "../components/SingleSelectDropdown";
import MultiSelectDropdown from "../components/MultiSelectDropdown";

function CommonEdit({
  title,
  apiPath,
  extraFields = [],
  extraData = {},
  onSuccessPath,
  lookupParam = "identifier",
  identityField = "identifier",
  showDescription = true,
}) {

  const navigate = useNavigate();

  const { identifier } = useParams();

  const [formData, setFormData] = useState({
    identifier: "",
    description: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // FETCH EXISTING DATA
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const response = await axiosInstance.get(
        `/${apiPath}/get?${lookupParam}=${encodeURIComponent(identifier)}`
      );

      console.log("EDIT DATA :", response.data);

      setFormData(response.data);

    } catch (err) {

      console.error(err);

      setError("Failed to load data");

    }
  };

  // HANDLE CHANGE
  const handleChange = (key, value) => {

    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // UPDATE SUBMIT
  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setLoading(true);

    try {

      const payload = {
        ...formData,
        ...extraData,
      };

      // BOOLEAN CONVERSION
      extraFields.forEach((field) => {

        if (field.valueFormat === "csv" && Array.isArray(payload[field.key])) {
          payload[field.key] = payload[field.key].join(",");
        }

        if (field.valueType === "boolean") {

          payload[field.key] =
            payload[field.key] === true ||
            payload[field.key] === "true";
        }

      });

      console.log("UPDATE PAYLOAD :", payload);

      await axiosInstance.post(
        `/${apiPath}/update`,
        payload
      );

      navigate(onSuccessPath || -1);

    } catch (err) {

      console.error(err);

      setError(
        err?.response?.data?.message ||
        err.message ||
        "Update failed"
      );

    } finally {

      setLoading(false);

    }
  };

  // RENDER FIELD
  const renderField = (field) => {

    // CUSTOM FIELD
    if (field.type === "custom") {
      return field.component;
    }

    // SINGLE SELECT
    if (field.type === "select") {

      return (
        <SingleSelectDropdown
          label={field.label}
          name={field.key}
          apiPath={field.apiPath}
          options={field.options}
          value={formData[field.key] || ""}
          placeholder={
            field.placeholder ||
            `Select ${field.label}`
          }
          required={field.required}
          onChange={handleChange}
        />
      );
    }

    // MULTI SELECT
    if (field.type === "multiselect") {

      return (
        <MultiSelectDropdown
          label={field.label}
          name={field.key}
          apiPath={field.apiPath}
          options={field.options}
          value={
            Array.isArray(formData[field.key])
              ? formData[field.key]
              : formData[field.key]
              ? String(formData[field.key]).split(",")
              : []
          }
          required={field.required}
          helperText="Hold Ctrl to select multiple"
          onChange={handleChange}
        />
      );
    }

    // NORMAL INPUT
    return (

      <div className="flex flex-col gap-1">

        <label className="text-sm font-semibold text-gray-600">
          {field.label}
        </label>

        <input
          type={field.type || "text"}
          value={formData[field.key] || ""}
          onChange={(event) =>
            handleChange(
              field.key,
              event.target.value
            )
          }
          required={field.required}
          className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
        />

      </div>
    );
  };

  return (

    <div className="w-full max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">

        <h2 className="text-2xl font-bold text-slate-900">
          Edit {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Update {title.toLowerCase()} details
        </p>

      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >

        {/* ERROR */}
        {error && (

          <div className="mb-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">

            {error}

          </div>

        )}

        {/* FORM GRID */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* IDENTIFIER */}
          <div className="flex flex-col gap-1">

            <label className="text-sm font-semibold text-gray-600">
              {identityField === "username" ? "Username" : "Identifier"}
            </label>

            <input
              type="text"
              value={formData[identityField] || ""}
              readOnly
              className="border border-gray-300 bg-gray-100 rounded-xl px-4 py-3 text-sm"
            />

          </div>

          {/* DESCRIPTION */}
          {showDescription && (
            <div className="flex flex-col gap-1 md:col-span-2">

              <label className="text-sm font-semibold text-gray-600">
                Description
              </label>

              <textarea
                rows={3}
                value={formData.description || ""}
                onChange={(event) =>
                  handleChange(
                    "description",
                    event.target.value
                  )
                }
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
              />

            </div>
          )}

          {/* EXTRA FIELDS */}
          {extraFields.map((field) => (

            <div key={field.key}>

              {renderField(field)}

            </div>

          ))}

        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          {/* CANCEL */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>

          {/* UPDATE */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Updating..."
              : `Update ${title}`}
          </button>

        </div>

      </form>

    </div>
  );
}

export default CommonEdit;
