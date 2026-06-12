import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CommonDropdown from "../components/CommonDropdown.jsx";

export default function AddFormSkeleton({
  title,
  apiPath,
  fields = [],
}) {
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8080/api";
  const token = localStorage.getItem("token");

  // State managers synced to structural requirements
  const [identifier, setIdentifier] = useState("");
  const [formData, setFormData] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [dropdownLoading, setDropdownLoading] = useState({});
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Stringify fields array to prevent redundant fetch loops inside useEffect
  const fieldsDependency = JSON.stringify(fields);

  // --- AUTOMATED API FETCH ENGINE ---
  useEffect(() => {
    fields.forEach((field) => {
      if (field.type === "select" && field.api) {
        setDropdownLoading((prev) => ({ ...prev, [field.name]: true }));

        const targetUrl = field.endpoint 
          ? `${BASE_URL}/${field.api}/${field.endpoint}`
          : `${BASE_URL}/${field.api}/findByStatus`;

        axios
          .get(targetUrl, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then((res) => {
            const extractedData = res.data?.data || res.data || [];
            setDropdownOptions((prev) => ({ ...prev, [field.name]: extractedData }));
          })
          .catch((err) => {
            console.error(`Error filling dropdown options for domain field [${field.name}]:`, err);
          })
          .finally(() => {
            setDropdownLoading((prev) => ({ ...prev, [field.name]: false }));
          });
      }
    });
  }, [fieldsDependency, token]);

  // --- VALUE MODIFIER ENGINE ---
  function handleValueChange(field, event) {
    const { name, value, options, selectedOptions } = event.target;
    const isMultiple = field.multiple || event.target.multiple;
    
    if (isMultiple) {
      const targetOptions = selectedOptions || (options ? Array.from(options).filter(o => o.selected) : []);
      const selectedValues = Array.from(targetOptions).map((opt) => opt.value);
        
      setFormData((prev) => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  // --- PERSISTENCE SUBMISSION CONTROLLER ---
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/${apiPath}/add`,
        {
          identifier,
          ...formData,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data;
      
      // Extract response text to evaluate message intent
      const serverMessage = (data?.message || data?.error || "").toLowerCase();

      // 🔍 INSPECT THE MESSAGE TEXT CONTENT FOR HIDDEN ERRORS (200 OK scenario)
      if (serverMessage.includes("already") || serverMessage.includes("exist") || serverMessage.includes("fail")) {
        setError(data.message || `This ${title} identity configuration already exists.`);
      } 
      else if (data && (data.identifier || data.success === true || data.status === "SUCCESS")) {
        setSuccess(`${title} successfully saved to terminal configuration.`);
        setTimeout(() => navigate(-1), 1500);
      } 
      else {
        setError("System configuration rejection. Please verify if this identifier is unique.");
      }
    } catch (err) {
      console.error("Submission Error Response:", err);
      
      if (err.response?.data) {
        const serverPayload = err.response.data;
        const msg = serverPayload.message || serverPayload.error;
        setError(typeof msg === "string" ? msg : `This ${title} identity is already registered.`);
      } else {
        setError("Network error: Could not complete registration deployment.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-left select-none">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
        
        {/* HEADER BLOCK */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Add New {title}</h2>
          <p className="text-xs text-slate-500 mt-1">Configure parameters for your system record below.</p>
        </div>

        {/* ALERTS BANNERS */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium p-3 rounded-xl mb-4 flex items-center gap-2">
            ⚠️ {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium p-3 rounded-xl mb-4 flex items-center gap-2">
            ✓ {success}
          </div>
        )}

        {/* INPUT LAYOUT FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Core Fixed Identifier Element */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
              System Identifier
            </label>
            <input
              type="text"
              placeholder="e.g., ITEM_CODE_01"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 text-slate-800 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono"
              required
            />
          </div>

          {/* Dynamic Extra Injection Fields */}
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "select" ? (
                dropdownLoading[field.name] ? (
                  <div className="text-xs text-slate-400 italic py-2">Loading runtime matrices...</div>
                ) : (
                  <CommonDropdown
                    label={field.label}
                    name={field.name}
                    options={dropdownOptions[field.name] || []}
                    value={formData[field.name] || (field.multiple ? [] : "")}
                    multiple={field.multiple || false}
                    optionLabel={field.optionLabel || "name"}
                    optionValue={field.optionValue || "identifier"}
                    onChange={(e) => handleValueChange(field, e)}
                  />
                )
              ) : (
                <>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    value={formData[field.name] || ""}
                    onChange={(e) => handleValueChange(field, e)}
                    required={field.required || false}
                    className="w-full border border-slate-200 bg-slate-50 text-slate-800 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </>
              )}
            </div>
          ))}

          {/* ACTIONS TRIGGER BUTTON PANEL CONTAINER */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-slate-100 text-slate-600 font-medium text-sm py-2.5 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white font-medium text-sm py-2.5 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving Configuration..." : `Add ${title}`}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}