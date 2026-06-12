import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CommonDropdown from "../components/CommonDropdown.jsx";

export default function EditFormSkeleton({
  title,
  apiPath,
  fields = [],
  paramKey = "identifier",
  getParamKey,
}) {
  const navigate = useNavigate();
  const params = useParams();

  const paramValue = params[paramKey];

  const BASE_URL = "http://localhost:8080/api";
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [dropdownLoading, setDropdownLoading] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fieldsDependency = JSON.stringify(fields);

  // LOAD DATA
  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(`${BASE_URL}/${apiPath}/get`, {
          params: {
            [getParamKey || paramKey]: paramValue,
          },
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        const prefilled = {};

        fields.forEach((field) => {
          let value = data[field.name];

          if (!value && field.name === "username") {
            value = data.username || data.identifier;
          }

          if (value !== undefined && value !== null) {
            if (field.type === "select") {
              if (field.multiple) {
                prefilled[field.name] = Array.isArray(value)
                  ? value.map((v) =>
                      String(
                        typeof v === "object"
                          ? v[field.optionValue || "identifier"]
                          : v
                      )
                    )
                  : [];
              } else {
                prefilled[field.name] = String(
                  typeof value === "object"
                    ? value[field.optionValue || "identifier"]
                    : value
                );
              }
            } else {
              prefilled[field.name] = value;
            }
          }
        });

        setFormData(prefilled);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [paramKey, paramValue, apiPath, token, fieldsDependency, getParamKey]);

  // LOAD DROPDOWNS
  useEffect(() => {
    fields.forEach((field) => {
      if (field.type === "select" && field.api) {
        setDropdownLoading((prev) => ({ ...prev, [field.name]: true }));

        const url = field.endpoint
          ? `${BASE_URL}/${field.api}/${field.endpoint}`
          : `${BASE_URL}/${field.api}/findByStatus`;

        axios
          .get(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((res) => {
            const data = res.data?.data || res.data || [];
            setDropdownOptions((prev) => ({
              ...prev,
              [field.name]: data,
            }));
          })
          .catch(() => {
            setDropdownOptions((prev) => ({
              ...prev,
              [field.name]: [],
            }));
          })
          .finally(() => {
            setDropdownLoading((prev) => ({
              ...prev,
              [field.name]: false,
            }));
          });
      }
    });
  }, [fieldsDependency, token]);

  // HANDLE CHANGE
  function handleValueChange(field, e) {
    const { name, value, selectedOptions } = e.target;

    if (field.multiple) {
      const values = Array.from(selectedOptions).map((opt) =>
        String(opt.value)
      );
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  // SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const payload = {
        ...formData,
        [paramKey]: paramValue,
      };

      const res = await axios.post(
        `${BASE_URL}/${apiPath}/update`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data;

      // FIX: check identifier exists and no error message returned from backend
      if (data && data.identifier && !data.message) {
        setSuccess(`${title} updated successfully`);
        setTimeout(() => navigate(-1), 1200);
      } else {
        // Show the backend's error message if available, otherwise a generic one
        setError(data?.message || "Update failed.");
      }
    } catch {
      setError("Server error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl border p-8 shadow-sm">

        <h2 className="text-xl font-bold mb-6">Edit {title}</h2>

        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
        {success && <div className="text-green-600 text-sm mb-3">{success}</div>}

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* READONLY KEY */}
            <div>
              <label className="text-sm mb-1 block capitalize">
                {paramKey}
              </label>
              <input
                value={paramValue}
                disabled
                className="w-full border p-2 bg-gray-100 rounded text-gray-500"
              />
            </div>

            {/* FIELDS */}
            {fields.map((field) => (
              <div key={field.name}>
                {field.type === "select" ? (
                  dropdownLoading[field.name] ? (
                    <p className="text-sm text-gray-400">Loading...</p>
                  ) : (
                    <CommonDropdown
                      label={field.label}
                      name={field.name}
                      options={dropdownOptions[field.name] || []}
                      value={
                        field.multiple
                          ? (formData[field.name] || []).map(String)
                          : String(formData[field.name] || "")
                      }
                      multiple={field.multiple || false}
                      optionLabel={field.optionLabel || "name"}
                      optionValue={field.optionValue || "identifier"}
                      onChange={(e) => handleValueChange(field, e)}
                    />
                  )
                ) : (
                  <>
                    <label className="text-sm mb-1 block">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type || "text"}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleValueChange(field, e)}
                      className="w-full border p-2 rounded"
                    />
                  </>
                )}
              </div>
            ))}

            {/* BUTTONS */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 p-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-blue-600 text-white p-2 rounded"
              >
                {saving ? "Updating..." : "Update"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}