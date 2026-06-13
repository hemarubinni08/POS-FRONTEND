import React, { useEffect, useRef, useState, useMemo } from "react";
import api from "../api/api";
import { ChevronDown, Check } from "lucide-react";

const CommonDropDown = ({
  name,
  value,
  onChange,
  api: apiUrl,
  payload = {},
  optionLabel = "identifier",
  optionValue = "identifier",
  placeholder = "Select option",
  multiple = false,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ FETCH OPTIONS
  const fetchOptions = async () => {
    try {
      setLoading(true);

      let res;

      if (typeof apiUrl === "function") {
        res = await apiUrl(payload);
      } else {
        res = await api.get(apiUrl, { params: payload });
      }

      let data = [];

      if (Array.isArray(res?.data)) {
        data = res.data;
      } else if (res?.data?.dtoList) {
        data = res.data.dtoList;
      } else if (res?.data?.data) {
        data = res.data.data;
      }

      setOptions(data);
    } catch (err) {
      console.error("Dropdown error:", err);
      setOptions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiUrl) fetchOptions();
  }, [apiUrl]);

  // ✅ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // ✅ ✅ FIXED: STABLE VALUE NORMALIZATION
  const selectedValues = useMemo(() => {
    if (multiple) {
      return Array.isArray(value) ? value : [];
    }
    return value ? [value] : [];
  }, [value, multiple]);

  // ✅ HANDLE SELECT
  const handleSelect = (val) => {
    if (multiple) {
      const exists = selectedValues.some(
        (v) => String(v) === String(val)
      );

      const updated = exists
        ? selectedValues.filter((v) => String(v) !== String(val))
        : [...selectedValues, val];

      onChange({
        target: { name, value: updated },
      });
    } else {
      onChange({
        target: { name, value: val },
      });
      setOpen(false);
    }
  };

  // ✅ SELECTED LABELS
  const selectedLabels = options
    .filter((o) =>
      selectedValues.some(
        (v) => String(v) === String(o?.[optionValue])
      )
    )
    .map((o) => o?.[optionLabel]);

  return (
    <div ref={dropdownRef} className="relative w-full">

      {/* SELECT BOX */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-slate-300 rounded-xl px-4 py-3 text-left text-sm flex justify-between items-center"
      >
        <span className={`${selectedLabels.length === 0 ? "text-slate-400" : ""}`}>
          {selectedLabels.length > 0
            ? multiple
              ? selectedLabels.join(", ")
              : selectedLabels[0]
            : placeholder}
        </span>

        <ChevronDown size={18} />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 w-full bg-white border border-slate-200 mt-1 rounded-xl shadow max-h-60 overflow-auto">

          {loading ? (
            <div className="p-3 text-sm">Loading...</div>
          ) : options.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">No data found</div>
          ) : (
            options.map((item, i) => {
              const val = item?.[optionValue];

              const checked = selectedValues.some(
                (v) => String(v) === String(val)
              );

              return (
                <div
                  key={i}
                  onClick={() => handleSelect(val)}
                  className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 text-sm"
                >
                  <span>{item?.[optionLabel]}</span>

                  {checked && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </div>
              );
            })
          )}

        </div>
      )}
    </div>
  );
};

export default CommonDropDown;
