import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const DropdownTemplate = ({
  label,
  name,
  options = [],
  apiPath,
  apiEndpoint,
  value,
  onChange,
  placeholder = "Select an option",
  multiple = false,
  required = false,
  helperText,
}) => {
  const [apiOptions, setApiOptions] = useState([]);
  const [loading, setLoading] = useState(Boolean(apiPath || apiEndpoint));

  useEffect(() => {
    if (!apiPath && !apiEndpoint) return;

    const fetchOptions = async () => {
      setLoading(true);

      try {
        const response = apiEndpoint
          ? await axiosInstance.get(apiEndpoint)
          : await axiosInstance.post(`/${apiPath}/list`, {
              page: 0,
              sizePerPage: 100,
              sortDirection: "ASC",
              sortField: "identifier",
            });

        const list = response.data.dtoList ?? response.data.content ?? response.data ?? [];
        setApiOptions(
          list.map((item) => ({
            value: item.identifier ?? item.id ?? item.name,
            label: item.name ?? item.identifier ?? item.id,
          }))
        );
      } catch (error) {
        console.error(`Failed to fetch ${label}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [apiPath, apiEndpoint, label]);

  const handleChange = (event) => {
    if (multiple) {
      const selected = Array.from(event.target.selectedOptions, (option) => option.value);
      onChange(name, selected);
    } else {
      onChange(name, event.target.value);
    }
  };

  const dropdownOptions = apiPath || apiEndpoint ? apiOptions : options;

  if (loading) {
    return <p className="text-sm text-gray-400">Loading {label}...</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <select
        name={name}
        value={value ?? (multiple ? [] : "")}
        onChange={handleChange}
        multiple={multiple}
        required={required}
        className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
      >
        {!multiple && <option value="">{placeholder}</option>}
        {dropdownOptions.map((option) => (
          <option key={option.value ?? option.label} value={option.value ?? option.label}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
      {helperText && <p className="text-xs text-gray-400">{helperText}</p>}
    </div>
  );
};

export default DropdownTemplate;
