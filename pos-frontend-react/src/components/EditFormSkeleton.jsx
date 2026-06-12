import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  inputDisabled: {
    padding: "9px 12px", border: `1.5px solid ${C.gray}`,
    borderRadius: "7px", fontSize: "13px",
    backgroundColor: C.offWhite, color: "#9ca3af",
    boxSizing: "border-box", width: "100%",
    cursor: "not-allowed", outline: "none",
  },
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
  loadingText: { textAlign: "center", color: C.muted, fontSize: "14px", padding: "40px 0" },
};

export default function EditFormSkeleton({
  title, apiPath,
  paramName = "identifier", identifierField = "identifier",
  extraFields = [], extraData: externalExtraData = {}, setters = {},
}) {
  const navigate = useNavigate();
  const params = useParams();
  const identifier = params[paramName];

  const [identifier_display, setIdentifierDisplay] = useState("");
  const [recordId, setRecordId] = useState(null);
  const [extraData, setExtraData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.get(`/${apiPath}/get`, { params: { [paramName]: identifier } });
        const data = res.data;
        setIdentifierDisplay(data[identifierField]);
        setRecordId(data.id);
        const prefilled = {};
        extraFields.forEach(field => {
          if (field.type !== "custom" && data[field.key] !== undefined) prefilled[field.key] = data[field.key];
        });
        setExtraData(prefilled);
        Object.entries(setters).forEach(([key, setter]) => { if (data[key] !== undefined) setter(data[key]); });
      } catch {
        setError("Could not load data. Please go back and try again.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [identifier, apiPath]);

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

  function validate() {
    const errors = {};
    extraFields.forEach(field => {
      if (field.type === "custom") {
        const val = externalExtraData[field.key];
        if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0))
          errors[field.key] = `${field.label || field.key} is required.`;
        return;
      }
      if (field.type === "multiselect") {
        if ((extraData[field.key] || []).length === 0) errors[field.key] = `${field.label} is required.`;
      } else {
        if (!String(extraData[field.key] || "").trim()) errors[field.key] = `${field.label} is required.`;
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await api.post(`/${apiPath}/update`, {
        id: recordId, [identifierField]: identifier_display,
        ...extraData, ...externalExtraData,
      });
      const data = res.data;
      if (data && data[identifierField]) {
        setSuccess(`${title} updated successfully`);
        setTimeout(() => navigate(-1), 1500);
      } else {
        setError("Update failed. Please try again.");
      }
    } catch {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.topRow}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>← Back</button>
          <h2 style={styles.pageTitle}>Edit {title}</h2>
        </div>

        <div style={styles.cardWrap}>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Update {title}</p>
            <p style={styles.cardSubtitle}>Update the details below</p>

            {error   && <div style={styles.errorBox}>{error}</div>}
            {success && <div style={styles.successBox}>{success}</div>}

            {loading ? <p style={styles.loadingText}>Loading {title} data…</p> : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.field}>
                  <label style={styles.label}>Identifier</label>
                  <input style={styles.inputDisabled} type="text" value={identifier_display} disabled />
                </div>

                {extraFields.map(field => (
                  <div key={field.key} style={styles.field}>
                    {field.type !== "custom" && <label style={styles.label}>{field.label}</label>}

                    {field.type === "custom" ? (
                      <>
                        {field.component}
                        {fieldErrors[field.key] && <span style={styles.fieldError}>{fieldErrors[field.key]}</span>}
                      </>
                    ) : field.type === "select" ? (
                      <>
                        <select style={{ ...styles.select, ...(fieldErrors[field.key] ? styles.inputError : {}) }}
                          value={extraData[field.key] ?? ""}
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
                          value={extraData[field.key] ?? ""}
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
                    style={{ ...styles.submitBtn, ...(submitting ? styles.submitBtnDisabled : {}) }}
                    disabled={submitting}>
                    {submitting ? "Saving…" : `Update ${title}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}