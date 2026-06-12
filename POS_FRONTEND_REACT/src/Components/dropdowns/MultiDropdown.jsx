import { useEffect, useState } from "react";
import api from "../Api";

const MultiDropdown = ({ name, value, onChange, apiUrl }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!apiUrl) return;

    api
      .post(apiUrl, { page: 0, sizePerPage: 10 })
      .then((res) => {
        setOptions(res.data.dtoList || res.data);
      })
      .catch(() => {
        console.error("Failed to load dropdown:", name);
      });
  }, [apiUrl]);

  const handleMultiChange = (e) => {
    const selected = Array.from(e.target.options)
      .filter((opt) => opt.selected)
      .map((opt) => opt.value);

    onChange({
      target: {
        name,
        value: selected,
      },
    });
  };

  return (
    <select
      name={name}
      multiple
      value={value || []}
      onChange={handleMultiChange}
      className="w-full p-3 border rounded"
    >
      {options.map((opt) => (
        <option key={opt.id} value={opt.identifier}>
          {opt.identifier}
        </option>
      ))}
    </select>
  );
};

export default MultiDropdown;