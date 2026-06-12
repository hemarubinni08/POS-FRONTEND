import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function SingleDropdown({
  label, apiUrl,
  selectedValue, onChange,
  valueField = "identifier", labelField = "identifier",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const res = await api.get(apiUrl);
        setOptions(res.data.map(item => ({ value: item[valueField], label: item[labelField] })));
      } catch {
        alert("Could not load list. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    loadOptions();
  }, [apiUrl, valueField, labelField]);

  const handleSelect = (value) => {
    onChange(value === selectedValue ? "" : value);
    setIsOpen(false);
  };

  if (loading) return <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "6px" }}>Loading {label}…</p>;

  return (
    <>
      <style>{`
        .sd2-wrap { width: 100%; position: relative; margin-bottom: 14px; font-family: "Segoe UI", sans-serif; }
        .sd2-label { font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 5px; display: block; letter-spacing: 0.2px; }
        .sd2-box {
          width: 100%; padding: 9px 12px;
          background: #fafafa; border: 1.5px solid #E8E8E8;
          border-radius: 7px; cursor: pointer;
          box-sizing: border-box; font-size: 13px;
          color: #1e2235; transition: border-color 0.15s;
          display: flex; align-items: center; justify-content: space-between;
        }
        .sd2-box:hover { border-color: #879EC6; }
        .sd2-box.open { border-color: #54668E; }
        .sd2-chevron { font-size: 10px; color: #9ca3af; transition: transform 0.2s; }
        .sd2-chevron.open { transform: rotate(180deg); }
        .sd2-menu {
          width: 100%; position: absolute;
          background: #ffffff; border: 1.5px solid #E8E8E8;
          border-radius: 8px; margin-top: 4px;
          max-height: 200px; overflow-y: auto;
          box-shadow: 0 8px 24px rgba(54,57,85,0.12);
          z-index: 50;
        }
        .sd2-item {
          padding: 9px 12px; display: flex;
          align-items: center; gap: 9px;
          cursor: pointer; border-bottom: 1px solid #f3f4f6;
          transition: background 0.1s; font-size: 13px; color: #374151;
        }
        .sd2-item:last-child { border-bottom: none; }
        .sd2-item:hover { background: #F5F6E6; }
        .sd2-item.selected { background: rgba(84,102,142,0.08); color: #363955; font-weight: 500; }
        .sd2-radio { transform: scale(1.05); cursor: pointer; accent-color: #54668E; }
      `}</style>

      <div className="sd2-wrap">
        <label className="sd2-label">{label}</label>
        <div className={`sd2-box ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <span>
            {selectedValue
              ? options.find(o => o.value === selectedValue)?.label ?? selectedValue
              : <span style={{ color: "#9ca3af" }}>Select…</span>}
          </span>
          <span className={`sd2-chevron ${isOpen ? "open" : ""}`}>▼</span>
        </div>
        {isOpen && (
          <div className="sd2-menu">
            {options.length === 0
              ? <div className="sd2-item">No items found</div>
              : options.map(opt => (
                <div key={opt.value}
                  className={`sd2-item ${selectedValue === opt.value ? "selected" : ""}`}
                  onClick={() => handleSelect(opt.value)}>
                  <input type="radio" className="sd2-radio" readOnly
                    checked={selectedValue === opt.value} />
                  {opt.label}
                </div>
              ))
            }
          </div>
        )}
      </div>
    </>
  );
}