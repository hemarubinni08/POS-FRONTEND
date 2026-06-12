import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import SingleSelectDropdown from "./SingleSelectDropdown";
import MultiSelectDropdown from "./MultiSelectDropdown";

function CommonAdd({
  title,
  apiPath,
  extraFields = [],
  extraData = {},
  onSuccessPath,
}) {

  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [description, setDescription] = useState("");
  const [values, setValues] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // HANDLE FIELD CHANGE
  const handleChange = (key, value) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // BUILD PAYLOAD
  const buildPayload = () => {

    const payload = {
      identifier,
      description,
      ...values,
      ...extraData,
    };

    extraFields.forEach((field) => {

      if (field.valueFormat === "csv" && Array.isArray(payload[field.key])) {
        payload[field.key] = payload[field.key].join(",");
      }

      // BOOLEAN CONVERSION
      if (field.valueType === "boolean") {
        payload[field.key] =
          payload[field.key] === true ||
          payload[field.key] === "true";
      }

    });

    return payload;
  };

  // SUBMIT
  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");
    setLoading(true);

    try {

      console.log("PAYLOAD :", buildPayload());

      const response = await axiosInstance.post(
        `/${apiPath}/add`,
        buildPayload()
      );

      console.log("RESPONSE :", response.data);

      if (response.data.success === false) {

        setError(
          response.data.message ||
          `Failed to add ${title}`
        );

        return;
      }

      navigate(onSuccessPath || -1);

    } catch (err) {

      console.error(err);

      const status = err?.response?.status;

      const message =
        err?.response?.data?.message ||
        err.message ||
        "Unable to save.";

      const endpoint = `/${apiPath}/add`;

      setError(
        status
          ? `${message} (HTTP ${status} on ${endpoint})`
          : message
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
          value={values[field.key] || ""}
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
          value={values[field.key] || []}
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
          placeholder={
            field.placeholder ||
            `Enter ${field.label}`
          }
          value={values[field.key] || ""}
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
          Add {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Fill in the details to add a new{" "}
          {title.toLowerCase()}.
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

        {/* FIELDS */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* IDENTIFIER */}
          <div className="flex flex-col gap-1">

            <label htmlFor="text-sm font-semibold text-gray-600">
              Identifier
            </label>

            <input
              type="text"
              placeholder="Enter identifier"
              value={identifier}
              onChange={(event) =>
                setIdentifier(event.target.value)
              }
              required
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />

          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col gap-1 md:col-span-2">

            <label htmlFor="description" className="text-sm font-semibold text-gray-600">
              Description
            </label>

            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={3}
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
            />

          </div>

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

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : `Add ${title}`}
          </button>

        </div>

      </form>

    </div>
  );
}

export default CommonAdd;
