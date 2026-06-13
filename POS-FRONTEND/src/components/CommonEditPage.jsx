import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonDropDown from "./CommonDropDown";

const CommonEditPage = ({
  title,
  getApi,
  updateApi,
  redirectRoute,
  fields,
  idParam = "identifier",
  submitButtonText = "Update",
}) => {
  const { [idParam]: id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ NORMALIZE DATA (supports multi-select perfectly)
  const normalizeData = (data) => {
    const result = { ...data };

    fields.forEach((f) => {
      if (f.type === "dropdown") {
        let val = result[f.name];

        // ✅ MULTI SELECT
        if (f.multiple) {
          if (!val) {
            result[f.name] = [];
          } else if (Array.isArray(val) && typeof val[0] === "string") {
            result[f.name] = val;
          } else if (Array.isArray(val)) {
            result[f.name] = val.map(
              (v) =>
                v?.[f.optionValue] ||
                v?.identifier ||
                v?.id
            );
          } else {
            result[f.name] = [];
          }
        }

        // ✅ SINGLE SELECT
        else {
          if (!val) {
            result[f.name] = "";
          } else if (typeof val === "string") {
            result[f.name] = val;
          } else if (typeof val === "object") {
            result[f.name] =
              val?.[f.optionValue] ||
              val?.identifier ||
              val?.id ||
              "";
          } else {
            result[f.name] = "";
          }
        }
      }
    });

    return result;
  };

  // ✅ LOAD DATA
  useEffect(() => {
    const load = async () => {
      try {
        setPageLoading(true);

        const res = await getApi(id);

        console.log("EDIT RESPONSE:", res.data);

        setFormData(normalizeData(res.data || {}));
      } catch (err) {
        console.error(err);
        setError("Failed to load data");
      } finally {
        setPageLoading(false);
      }
    };

    load();
  }, [id]);

  // ✅ HANDLE CHANGE
  const handleChange = ({ target }) => {
    const { name, value, type } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "true" : value,
    }));
  };

  // ✅ BUILD PAYLOAD (already correct for multi-select)
  const buildPayload = (data) => {
    const result = { ...data };

    fields.forEach((f) => {
      if (f.type === "dropdown") {
        result[f.name] = data[f.name];
      }
    });

    return result;
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = buildPayload(formData);

      console.log("FINAL PAYLOAD:", payload);

      await updateApi(payload);

      navigate(redirectRoute);
    } catch (err) {
      console.error(err);
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RENDER FIELD
  const renderField = (f) => {
    const value = formData?.[f.name] ?? (f.multiple ? [] : "");

    switch (f.type) {
      case "text":
      case "number":
        return (
          <input
            type={f.type}
            name={f.name}
            value={value}
            onChange={handleChange}
            disabled={f.disabledOnEdit}
            className="form-control"
          />
        );

      case "dropdown":
        return (
          <CommonDropDown
            key={f.name + JSON.stringify(value)} // ✅ forces rerender for preselected
            {...f}
            value={value}
            onChange={handleChange}
          />
        );

      case "radio":
        return f.options.map((o) => (
          <label key={o.value} className="me-3">
            <input
              type="radio"
              name={f.name}
              value={o.value}
              checked={String(value) === String(o.value)}
              onChange={handleChange}
            />
            {o.label}
          </label>
        ));

      default:
        return null;
    }
  };

  if (pageLoading || !formData) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <h4>{title}</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {fields.map((f, i) => (
            <div key={i} className="mb-3">
              <label className="form-label">{f.label}</label>
              {renderField(f)}
            </div>
          ))}

          {/* ✅ BUTTONS */}
          <div className="d-flex gap-2">
            <button className="btn btn-success" disabled={loading}>
              {loading ? "Updating..." : submitButtonText}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(redirectRoute)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommonEditPage;