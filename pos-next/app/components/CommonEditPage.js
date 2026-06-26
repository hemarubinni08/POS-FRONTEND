"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PropTypes from "prop-types";
import api from "../services/api";
import CommonDropDown from "./CommonDropDown";
import Layout from "./Layout";

export default function CommonEditPage({
  title = "Edit",
  fetchApi,
  updateApi,
  redirectRoute,
  fields = [],
  identifierParam = "identifier",
  submitButtonText = "Update",
  initialData,
  onSuccess,
}) {
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [pageLoading, setPageLoading] = useState(true);

  // ✅ HELPER → Get nested value
  const getValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  // ✅ FIXED handleChange (nested support)
  const handleChange = (e) => {
    const { name, value } = e.target;

    const keys = name.split(".");

    setFormData((prev) => {
      const updated = { ...prev };
      let temp = updated;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          if (!temp[key]) temp[key] = {}; // ✅ ensure nested object
          temp = temp[key];
        }
      });

      return updated;
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ✅ Normalize dropdown values
  const normalizeDropdownValue = (field, val) => {
    const key = field.optionValue || "identifier";

    if (field.multiple) {
      if (!val) return [];
      if (Array.isArray(val)) {
        return val.map((item) =>
          typeof item === "object" ? item[key] : item
        );
      }
      return [typeof val === "object" ? val[key] : val];
    }

    if (val && typeof val === "object") return val[key];
    return val;
  };

  // ✅ Load data
  const loadData = async (identifier) => {
    try {
      setPageLoading(true);

      const res =
        typeof fetchApi === "function"
          ? await fetchApi(identifier)
          : await api.get(fetchApi, { params: { identifier } });

      let data = res?.data ?? res ?? {};

      // normalize dropdowns
      fields.forEach((f) => {
        if (f.type === "dropdown") {
          const val = getValue(data, f.name);
          const normalized = normalizeDropdownValue(f, val);

          // set nested value
          const keys = f.name.split(".");
          let temp = data;

          keys.forEach((k, i) => {
            if (i === keys.length - 1) {
              temp[k] = normalized;
            } else {
              temp[k] = temp[k] || {};
              temp = temp[k];
            }
          });
        }
      });

      setFormData(data);
    } catch (err) {
      console.error("Load failed:", err);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setPageLoading(false);
      return;
    }

    const identifier = params?.[identifierParam];
    if (identifier) loadData(identifier);
  }, [params, initialData]);

  // ✅ FIXED validation (nested)
  const validate = () => {
    const newErrors = {};

    fields.forEach((f) => {
      let val = formData;

      f.name.split(".").forEach((k) => {
        val = val?.[k];
      });

      if (f.type === "dropdown" && f.multiple) {
        if (!val || val.length === 0) {
          newErrors[f.name] = "Required";
        }
        return;
      }

      if (!val && !f.readOnly) {
        newErrors[f.name] = "Required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);

      if (typeof updateApi === "function") {
        await updateApi(formData);
      } else {
        await api.post(updateApi, formData);
      }

      if (onSuccess) return onSuccess();
      if (redirectRoute) return router.push(redirectRoute);
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (f, val) => {
    if (f.type === "dropdown") {
      return (
        <CommonDropDown
          {...f}
          value={val}
          onChange={handleChange}
        />
      );
    }

    if (f.type === "radio") {
      return (
        <div className="flex gap-4 mt-2">
          {f.options.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="radio"
                name={f.name}
                value={opt.value}
                checked={String(val) === String(opt.value)}
                onChange={handleChange}
                className="accent-blue-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      );
    }

    return (
      <input
        type={f.type}
        name={f.name}
        value={val}
        onChange={handleChange}
        disabled={f.readOnly}
        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600"
      />
    );
  };

  if (pageLoading || !formData) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <div className="px-6 py-4 bg-white border rounded-lg">
            Loading...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-center py-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border">

          <div className="px-6 py-5 border-b flex justify-between">
            <h2 className="text-xl font-bold">{title}</h2>

            <button
              onClick={() =>
                onSuccess
                  ? onSuccess()
                  : redirectRoute && router.push(redirectRoute)
              }
              className="w-9 h-9 bg-gray-100 rounded-lg"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {fields.map((f) => {
                const val =
                  getValue(formData, f.name) ?? (f.multiple ? [] : "");

                return (
                  <div key={f.name}>
                    <label className="text-sm font-medium">
                      {f.label}
                    </label>

                    {renderFormField(f, val)}

                    {errors[f.name] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[f.name]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() =>
                  redirectRoute && router.push(redirectRoute)
                }
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 bg-blue-700 text-white rounded"
              >
                {loading ? "Updating..." : submitButtonText}
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}

CommonEditPage.propTypes = {
  title: PropTypes.string,
  fetchApi: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  updateApi: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  redirectRoute: PropTypes.string,
  fields: PropTypes.array,
  identifierParam: PropTypes.string,
  submitButtonText: PropTypes.string,
  initialData: PropTypes.object,
  onSuccess: PropTypes.func,
};