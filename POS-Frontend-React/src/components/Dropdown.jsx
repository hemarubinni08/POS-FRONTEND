import { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";
 
const Dropdown = ({
  label,
  name,
  options = [],
  apiPath,
  value,
  onChange,
  placeholder = "Select an option",
  multiple = false,
  required = false,
  helperText,
}) => {
  const [apiOptions, setApiOptions] = useState([]);
  const [loading, setLoading] = useState(Boolean(apiPath));
  const [error, setError] = useState("");
 
  useEffect(() => {
    if (!apiPath) return;
 
    const fetchOptions = async () => {
      setLoading(true);
      setError("");
 
      try {
        const response = await axiosInstance.post(`/${apiPath}/list`, {
          page: 0,
          sizePerPage: 100,
          sortDirection: "ASC",
          sortField: "identifier",
        });
 
        const list =
          response.data.dtoList ??
          response.data.content ??
          (Array.isArray(response.data) ? response.data : []);

        setApiOptions(
          list.filter((item) => item.status !== false).map((item) => ({
            value: item.identifier ?? item.id ?? item.name,
            label: item.name ?? item.identifier ?? item.id,
          }))
        );
      } catch (error) {
        const status = error?.response?.status;
        const message =
          error?.response?.data?.message ||
          error?.message ||
          `Failed to fetch ${label}`;
        const endpoint = `/${apiPath}/list`;
        setError(status ? `${message} (HTTP ${status} on ${endpoint})` : message);
        console.error(`Failed to fetch ${label}:`, error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchOptions();
  }, [apiPath, label]);
 
  const handleChange = (event) => {
    if (multiple) {
      const selected = Array.from(event.target.selectedOptions, (option) => option.value);
      onChange(name, selected);
    } else {
      onChange(name, event.target.value);
    }
  };
 
  const dropdownOptions = apiPath ? apiOptions : options;
 
  if (loading) {
    return <p className="text-sm text-gray-400">Loading {label}...</p>;
  }

  if (error) {
    return <p className="text-sm text-rose-600">{error}</p>;
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
 
export default Dropdown;
