import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function BaseAddForm({
  title,
  apiPath,
  extraFields = [],
  extraData: externalExtraData = {},
}) {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [extraData, setExtraData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const res = await api.post(`/${apiPath}/add`, {
        identifier,
        ...extraData,
        ...externalExtraData,
      });

      const data = res.data;

      if (data && data.identifier) {
        setSuccess(`${title} added successfully`);
        setTimeout(() => navigate(-1), 1500);
      } else {
        setError("Failed to add. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-10 w-full max-w-[460px]">
        
        {/* HEADER */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Add {title}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in the details below
          </p>
        </div>

        {/* STATUS NOTIFICATIONS */}
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
          
          {/* IDENTIFIER FIELD */}
          <div className="flex flex-col gap-1.5 text-left">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Identifier
            </label>
            <input
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm transition-all focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 outline-none placeholder-slate-400 text-slate-800 font-medium shadow-sm"
              type="text"
              placeholder="Enter identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>

          {/* DYNAMIC EXTRA FIELDS */}
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
                <select
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm transition-all focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 outline-none text-slate-800 font-medium shadow-sm cursor-pointer appearance-none"
                  onChange={(e) => handleExtraChange(field.key, e.target.value)}
                  required={field.required || false}
                  defaultValue=""
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
                  onChange={(e) => handleExtraChange(field.key, e.target.value)}
                  required={field.required || false}
                />
              )}
            </div>
          ))}

          {/* ACTION BUTTON CONTROLS */}
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
              disabled={loading}
              className={`flex-1 py-2.5 font-semibold text-white rounded-md text-xs uppercase tracking-wider shadow-sm transition-all border ${
                loading
                  ? "bg-slate-400 border-slate-400 cursor-not-allowed animate-pulse"
                  : "bg-slate-900 border-slate-800 hover:bg-blue-600 hover:border-blue-700 cursor-pointer"
              }`}
            >
              {loading ? "Saving..." : `Add ${title}`}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}