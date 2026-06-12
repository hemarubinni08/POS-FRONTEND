import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const C = {
  navy: "#363955", mid: "#54668E", light: "#879EC6",
  gray: "#E8E8E8", offWhite: "#F5F6E6", text: "#1e2235",
  muted: "#6b7280", white: "#ffffff",
  error: "#c0392b", errorBg: "#fdf2f2",
};

const styles = {
  page: {
    position: "fixed", top: "60px", left: "220px", right: 0, bottom: 0,
    backgroundColor: "#F0F1F5", fontFamily: "'Segoe UI', sans-serif",
    display: "flex", flexDirection: "column", overflow: "hidden",
  },
  inner: {
    flex: 1, padding: "20px 24px",
    display: "flex", flexDirection: "column", overflow: "hidden",
  },
  topRow: {
    display: "flex", alignItems: "center", gap: "12px",
    marginBottom: "16px", flexShrink: 0, position: "relative",
  },
  backBtn: {
    padding: "7px 16px", backgroundColor: "transparent",
    color: C.mid, border: `1.5px solid ${C.mid}`,
    borderRadius: "7px", fontSize: "12px",
    fontWeight: "600", cursor: "pointer", flexShrink: 0,
  },
  pageTitle: {
    position: "absolute", left: "50%", transform: "translateX(-50%)",
    margin: 0, fontSize: "19px", fontWeight: "700",
    color: C.navy, whiteSpace: "nowrap",
  },
  cardWrap: {
    flex: 1, display: "flex",
    alignItems: "center", justifyContent: "center", overflow: "hidden",
  },
  card: {
    background: C.white, borderRadius: "10px",
    boxShadow: "0 2px 12px rgba(54,57,85,0.08)",
    border: `1px solid ${C.gray}`,
    padding: "24px 28px", width: "100%",
    maxWidth: "720px", maxHeight: "100%", overflow: "auto",
  },
  cardTitle: { fontSize: "16px", fontWeight: "700", color: C.navy, margin: "0 0 3px" },
  cardSubtitle: { fontSize: "12px", color: C.muted, marginBottom: "18px" },
  successBox: {
    backgroundColor: "#f0fdf4", border: "1px solid #86efac",
    color: "#166534", borderRadius: "7px",
    padding: "9px 14px", fontSize: "13px",
    marginBottom: "14px", textAlign: "center", gridColumn: "span 2",
  },
  errorBox: {
    backgroundColor: C.errorBg, border: "1px solid #f5c6c6",
    color: C.error, borderRadius: "7px",
    padding: "9px 14px", fontSize: "13px",
    marginBottom: "14px", textAlign: "center", gridColumn: "span 2",
  },
  form: {
    display: "grid", gridTemplateColumns: "1fr 1fr",
    columnGap: "20px", rowGap: "12px",
  },
  field: { display: "flex", flexDirection: "column", gap: "4px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#374151", letterSpacing: "0.2px" },
  input: {
    padding: "9px 12px", border: `1.5px solid ${C.gray}`,
    borderRadius: "7px", fontSize: "13px", outline: "none",
    backgroundColor: "#fafafa", boxSizing: "border-box", width: "100%",
    color: C.text,
  },
  inputError: { border: `1.5px solid ${C.error}`, backgroundColor: C.errorBg },
  fieldError: { fontSize: "11px", color: C.error, marginTop: "2px" },
  select: {
    padding: "9px 12px", border: `1.5px solid ${C.gray}`,
    borderRadius: "7px", fontSize: "13px", outline: "none",
    backgroundColor: "#fafafa", boxSizing: "border-box", width: "100%",
    color: C.text,
  },
  multiWrap: {
    display: "flex", flexWrap: "wrap", gap: "6px", padding: "9px",
    border: `1.5px solid ${C.gray}`, borderRadius: "7px",
    backgroundColor: "#fafafa", minHeight: "42px",
  },
  chip: {
    padding: "4px 12px", borderRadius: "20px",
    border: `1.5px solid ${C.gray}`,
    backgroundColor: C.white, fontSize: "12px",
    cursor: "pointer", fontWeight: "500", color: "#374151",
  },
  chipSelected: {
    background: `linear-gradient(135deg, ${C.navy}, ${C.mid})`,
    borderColor: C.mid, color: "#fff", fontWeight: "600",
  },
  buttonRow: {
    display: "flex", gap: "10px", marginTop: "6px", gridColumn: "span 2",
  },
  cancelBtn: {
    flex: 1, padding: "10px",
    backgroundColor: C.offWhite, color: "#374151",
    border: `1px solid ${C.gray}`,
    borderRadius: "7px", fontSize: "13px",
    fontWeight: "600", cursor: "pointer",
  },
  submitBtn: {
    flex: 1, padding: "10px",
    background: `linear-gradient(135deg, ${C.navy}, ${C.mid})`,
    color: "#fff", border: "none",
    borderRadius: "7px", fontSize: "13px",
    fontWeight: "600", cursor: "pointer",
    boxShadow: `0 3px 10px rgba(54,57,85,0.25)`,
  },
  submitBtnDisabled: { background: "#c4c8d4", boxShadow: "none", cursor: "not-allowed" },
};

export default function AddFormSkeleton({
  title, apiPath,
  apiEndpoint = "add",
  extraFields = [],
  extraData: externalExtraData = {},
  showIdentifier = true,
}) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [extraData, setExtraData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [identifierError, setIdentifierError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [activeDropdownKey, setActiveDropdownKey] = useState(null);

  function handleExtraChange(key, value) {
    setExtraData(prev => ({ ...prev, [key]: value }));
    if (fieldErrors[key]) setFieldErrors(prev => ({ ...prev, [key]: "" }));
  }

  function handleMultiToggle(key, value) {
    setExtraData(prev => {
      const current = prev[key] || [];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [key]: updated };
    });
    if (fieldErrors[key]) setFieldErrors(prev => ({ ...prev, [key]: "" }));
  }

  function handleIdentifierChange(e) {
    setIdentifier(e.target.value);
    if (identifierError) setIdentifierError(false);
    if (error) setError("");
    if (fieldErrors.identifier) setFieldErrors(prev => ({ ...prev, identifier: "" }));
  }

  function validate() {
    const errors = {};
    if (showIdentifier && !identifier.trim()) errors.identifier = "Identifier is required.";
    extraFields.forEach(field => {
      if (field.type === "custom") return;
      if (field.type === "multiselect") {
        if ((extraData[field.key] || []).length === 0) errors[field.key] = `${field.label} is required.`;
      } else {
        if (!String(extraData[field.key] || "").trim()) errors[field.key] = `${field.label} is required.`;
      }
    });
    extraFields.forEach(field => {
      if (field.type !== "custom") return;
      const val = externalExtraData[field.key];
      if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0))
        errors[field.key] = `${field.label || field.key} is required.`;
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess(""); setIdentifierError(false);
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post(`/${apiPath}/${apiEndpoint}`, {
        ...(showIdentifier ? { identifier } : {}),
        ...extraData,
        ...externalExtraData,
      });
      const data = res.data;
      if (data.success === false) {
        setError(data.message || "Already exists. Please use a different one.");
        setIdentifierError(true);
        return;
      }
      if (data.identifier || data.username) {
        setSuccess(`${title} added successfully`);
        setTimeout(() => navigate(-1), 1500);
      } else {
        setError("Failed to add. Please try again.");
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.topRow}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
          <h2 style={styles.pageTitle}>Add {title}</h2>
        </div>

        <div style={styles.cardWrap}>
          <div style={styles.card}>
            <p style={styles.cardTitle}>New {title}</p>
            <p style={styles.cardSubtitle}>Fill in the details below</p>

            {error   && <div style={styles.errorBox}>{error}</div>}
            {success && <div style={styles.successBox}>{success}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
              {showIdentifier && (
                <div style={styles.field}>
                  <label style={styles.label}>Identifier</label>
                  <input
                    style={{ ...styles.input, ...((identifierError || fieldErrors.identifier) ? styles.inputError : {}) }}
                    type="text" placeholder="Enter identifier"
                    value={identifier} onChange={handleIdentifierChange}
                  />
                  {fieldErrors.identifier && <span style={styles.fieldError}>{fieldErrors.identifier}</span>}
                </div>
              )}

              {extraFields.map(field => (
                <div key={field.key} style={styles.field}>
                  {field.type !== "custom" && <label style={styles.label}>{field.label}</label>}

                  {field.type === "custom" ? (
                    <>
                      {typeof field.component === "function"
                        ? field.component({ isOpen: activeDropdownKey === field.key, setOpen: open => setActiveDropdownKey(open ? field.key : null) })
                        : field.component}
                      {fieldErrors[field.key] && <span style={styles.fieldError}>{fieldErrors[field.key]}</span>}
                    </>
                  ) : field.type === "select" ? (
                    <>
                      <select style={{ ...styles.select, ...(fieldErrors[field.key] ? styles.inputError : {}) }}
                        onChange={e => handleExtraChange(field.key, e.target.value)}>
                        <option value="">Select {field.label}</option>
                        {field.options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                      {fieldErrors[field.key] && <span style={styles.fieldError}>{fieldErrors[field.key]}</span>}
                    </>
                  ) : field.type === "multiselect" ? (
                    <>
                      <div style={{ ...styles.multiWrap, ...(fieldErrors[field.key] ? styles.inputError : {}) }}>
                        {field.options?.map(opt => {
                          const isSelected = (extraData[field.key] || []).includes(opt.value);
                          return (
                            <button key={opt.value} type="button"
                              onClick={() => handleMultiToggle(field.key, opt.value)}
                              style={{ ...styles.chip, ...(isSelected ? styles.chipSelected : {}) }}>
                              {isSelected ? "✓ " : ""}{opt.label}
                            </button>
                          );
                        })}
                      </div>
                      {fieldErrors[field.key] && <span style={styles.fieldError}>{fieldErrors[field.key]}</span>}
                    </>
                  ) : (
                    <>
                      <input
                        style={{ ...styles.input, ...(fieldErrors[field.key] ? styles.inputError : {}) }}
                        type={field.type || "text"} placeholder={`Enter ${field.label}`}
                        onChange={e => handleExtraChange(field.key, e.target.value)}
                      />
                      {fieldErrors[field.key] && <span style={styles.fieldError}>{fieldErrors[field.key]}</span>}
                    </>
                  )}
                </div>
              ))}

              <div style={styles.buttonRow}>
                <button type="button" style={styles.cancelBtn} onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit"
                  style={{ ...styles.submitBtn, ...(loading ? styles.submitBtnDisabled : {}) }}
                  disabled={loading}>
                  {loading ? "Saving…" : `Add ${title}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}