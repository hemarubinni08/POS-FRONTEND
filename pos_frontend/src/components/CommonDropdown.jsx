import React from "react";

const CommonDropdown = ({
  name,
  label,
  options = [],
  value,
  onChange,
  multiple = false,
  optionLabel = "name",
  optionValue = "identifier", // ✅ single value only
}) => {

  // ✅ helper to support fallback (identifier OR username)
  const getValue = (opt) => {
    return opt?.[optionValue] ?? opt?.username ?? opt?.id ?? "";
  };

  const getLabel = (opt) => {
    return opt?.[optionLabel] ?? opt?.name ?? opt?.identifier ?? "";
  };

  return (
    <div>
      <label className="text-black block mb-1">{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        multiple={multiple}
        className="w-full border p-2 bg-white text-black"
      >
        {!multiple && <option value="">Select {label}</option>}

        {options.map((opt, index) => {
          const val = getValue(opt);
          const labelText = getLabel(opt);

          return (
            <option
              key={val || index}   // ✅ FIX: always unique
              value={String(val)}
              className="text-black"
            >
              {labelText}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CommonDropdown;