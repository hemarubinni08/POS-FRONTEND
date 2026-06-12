import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function BaseEditForm({
  title,
  apiPath,
  extraFields = [],
  extraData: externalExtraData = {},
  setters = {},
}) {
  const navigate = useNavigate();
  const { identifier } = useParams();

  const [identifier_display, setIdentifierDisplay] = useState("");
  const [extraData, setExtraData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        const res = await api.get(`/${apiPath}/get`, {
          params: { identifier }
        });
        const data = res.data;
        
        setIdentifierDisplay(data.identifier);
        
        const prefilled = {};
        extraFields.forEach((field) => {
          if (field.type !== "custom" && data[field.key] !== undefined) {
            prefilled[field.key] = data[field.key];
          }
        });
        setExtraData(prefilled);
        
        Object.entries(setters).forEach(([key, setter]) => {
          if (data[key] !== undefined) {
            setter(data[key]);
          }
        });
      } catch (err) {
        setError("Could not load data. Please go back and try again.");
      } finally {
        setLoading(false);
      }
    }

    if (identifier) {
      loadData();
    }
  }, [identifier, apiPath]);

  function handleExtraChange(key, value) {
    setExtraData((prev) => ({ ...prev, [key]: value }));
  }

  function handleMultiToggle(key, value) {
    setExtraData((prev) => {
      const current = prev[key] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const res = await api.post(`/${apiPath}/update`, {
        identifier: identifier_display,
        ...extraData,
        ...externalExtraData,
      });

      const data = res.data;

      if (data && data.identifier) {
        setSuccess(`${title} updated successfully`);
        setTimeout(() => navigate(-1), 1500);
      } else {
        setError("Update failed. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-10 w-full max-w-[460px] flex flex-col items-center justify-center animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
          <div className="h-3 bg-slate-100 rounded w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-10 w-full max-w-[460px]">
        
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Edit {title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Update the details below
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2.5 rounded-md mb-4 text-xs font-medium text-center shadow-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2.5 rounded-md mb-4 text-xs font-medium text-center shadow-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-1.5 text-left">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Identifier
            </label>
            <input
              className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-400 cursor-not-allowed outline-none shadow-inner"
              type="text"
              value={identifier_display}
              disabled
            />
          </div>

          {extraFields.map((field) => (
            <div key={field.key} className="flex flex-col gap-1.5 text-left">
              
              {field.type !== "custom" && (
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {field.label}
                </label>
              )}

              {field.type === "custom" ? (
                field.component
              ) : field.type === "select" ? (
                <div className="relative">
                  <select
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm transition-all focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 outline-none text-slate-800 font-medium shadow-sm cursor-pointer appearance-none"
                    value={extraData[field.key] || ""}
                    onChange={(e) => handleExtraChange(field.key, e.target.value)}
                    required={field.required || false}
                  >
                    <option value="" disabled className="text-slate-400">
                      Select {field.label}...
                    </option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ) : field.type === "multiselect" ? (
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50/50 border border-slate-200 rounded-lg min-h-[48px]">
                  {field.options?.map((opt) => {
                    const isSelected = (extraData[field.key] || []).includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleMultiToggle(field.key, opt.value)}
                        className={`px-3 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-blue-50 border-blue-200 text-blue-700 shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {isSelected ? "✓ " : ""}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm transition-all focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 outline-none placeholder-slate-400 text-slate-800 font-medium shadow-sm"
                  type={field.type || "text"}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  value={extraData[field.key] || ""}
                  onChange={(e) => handleExtraChange(field.key, e.target.value)}
                  required={field.required || false}
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 rounded-md text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 py-2.5 font-semibold text-white rounded-md text-xs uppercase tracking-wider shadow-sm transition-all border ${
                submitting
                  ? "bg-slate-400 border-slate-400 cursor-not-allowed animate-pulse"
                  : "bg-slate-900 border-slate-800 hover:bg-blue-600 hover:border-blue-700 cursor-pointer"
              }`}
            >
              {submitting ? "Saving..." : `Update ${title}`}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}