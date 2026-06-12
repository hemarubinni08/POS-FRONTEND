import React, { useEffect, useState } from "react";
import api from "../../api/axios";

export default function SingleDropdown({
  label,
  entity,                 
  selectedValue,          // single string, not an array
  onChange,               // called with a single value (string)
  valueField = "identifier",
  labelField = "identifier",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===== FETCH OPTIONS ===== */
  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `http://localhost:8080/api/${entity}/getAllActive`,
        );
        console.log("Dropdown API Response:", res.data);

        const mapped = res.data.map((item) => ({
          value: item[valueField],
          label: item[labelField],
        }));

        setOptions(mapped);
      } catch (err) {
        console.error("Error loading dropdown:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [valueField, labelField]);

  const toggle = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    // If same value clicked again, deselect; otherwise select the new one
    onChange(value === selectedValue ? "" : value);
    setIsOpen(false); // close after selection
  };

  /* ===== SKELETON LOADER FOR THE DROPDOWN FIELD ===== */
  if (loading) {
    return (
      <div className="w-full mb-5 animate-pulse">
        <div className="h-3.5 bg-slate-200 rounded w-24 mb-2" />
        <div className="h-10 bg-slate-100 rounded-lg border border-slate-200 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full relative mb-5 text-left">
      {/* RUNTIME VIEW COMPONENT LABEL */}
      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
        {label}
      </label>

      {/* CORE DISPLAY DROPDOWN BOX */}
      <div
        onClick={toggle}
        className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-lg text-sm transition-all duration-150 cursor-pointer ${
          isOpen 
            ? "border-slate-400 ring-2 ring-slate-900/5 shadow-sm" 
            : "border-slate-200 hover:border-slate-300 shadow-sm"
        }`}
      >
        <span className={`truncate ${selectedValue ? "text-slate-800 font-medium" : "text-slate-400"}`}>
          {selectedValue
            ? options.find((o) => o.value === selectedValue)?.label ?? selectedValue
            : "Select configuration..."}
        </span>
        
        {/* ROTATING DIRECTIONAL ARROW DECORATOR */}
        <svg
          className={`h-4 w-4 text-slate-400 transition-transform duration-150 ml-2 shrink-0 ${isOpen ? "rotate-180 text-slate-600" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* FLOATING ACTION SELECTION MENU LAYER */}
      {isOpen && (
        <div className="w-full absolute left-0 bg-white border border-slate-200 rounded-lg mt-1.5 max-h-56 overflow-y-auto shadow-xl z-50 divide-y divide-slate-50">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-xs text-slate-400 italic">
              No items discovered at target node.
            </div>
          ) : (
            options.map((opt) => {
              const isSelected = selectedValue === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`flex items-center justify-between px-4 py-2.5 text-xs font-medium cursor-pointer transition-colors duration-100 ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="truncate pr-2">{opt.label}</span>
                  
                  {/* TEXT BADGE FILL STATUS RENDERER */}
                  {isSelected && (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-blue-100 text-blue-800 rounded">
                      Active
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}