import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import SingleSelectDropdown from "./Dropdown/SingleSelectDropdown";
import MultiSelectDropdown from "./Dropdown/MultiSelectDropdown";

function CommonAddTemplate({
  title,
  apiPath,
  extraFields = [],
  extraData = {},
  onSuccessPath,
  showDescription = true,
}) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [description, setDescription] = useState("");
  const [values, setValues] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const buildPayload = () => {
    const payload = {
      identifier,
      ...(showDescription ? { description } : {}),
      ...values,
      ...extraData,
    };

    extraFields.forEach((field) => {
      if (field.asArray) {
        payload[field.key] = Array.isArray(payload[field.key])
          ? payload[field.key]
          : payload[field.key]
            ? [payload[field.key]]
            : [];
      }
      if (field.valueType === "boolean") {
        payload[field.key] = payload[field.key] === true || payload[field.key] === "true";
      }
    });

    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/${apiPath}/add`, buildPayload());
      if (response.data.success === false) {
        setError(response.data.message || `Failed to add ${title}`);
        return;
      }
      navigate(onSuccessPath || -1);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Unable to save.");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    if (field.type === "custom") return field.component;

    if (field.type === "select") {
      return (
        <SingleSelectDropdown
          label={field.label}
          name={field.key}
          apiPath={field.apiPath}
          apiEndpoint={field.apiEndpoint}
          options={field.options}
          value={values[field.key] || ""}
          placeholder={field.placeholder || `Select ${field.label}`}
          required={field.required}
          onChange={handleChange}
        />
      );
    }

    if (field.type === "multiselect") {
      return (
        <MultiSelectDropdown
          label={field.label}
          name={field.key}
          apiPath={field.apiPath}
          apiEndpoint={field.apiEndpoint}
          options={field.options}
          value={values[field.key] || []}
          required={field.required}
          helperText="Hold Ctrl to select multiple"
          onChange={handleChange}
        />
      );
    }

    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-600">{field.label}</label>
        <input
          type={field.type || "text"}
          placeholder={field.placeholder || `Enter ${field.label}`}
          value={values[field.key] || ""}
          onChange={(event) => handleChange(field.key, event.target.value)}
          required={field.required}
          className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Add {title}</h2>
        <p className="mt-1 text-sm text-slate-500">Fill in the details to add a new {title.toLowerCase()}.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {error && <div className="mb-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{error}</div>}

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-600">Identifier</label>
            <input
              type="text"
              placeholder="Enter identifier"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              required
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          {showDescription && (
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-sm font-semibold text-gray-600">Description</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
              />
            </div>
          )}

          {extraFields.map((field) => (
            <div key={field.key}>{renderField(field)}</div>
          ))}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Saving..." : `Add ${title}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommonAddTemplate;
