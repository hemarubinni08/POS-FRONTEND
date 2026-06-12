import { useEffect, useState } from "react";
import api from "../Api";

const SingleDropdown = ({ name, value, onChange, apiUrl, placeholder }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!apiUrl) return;

    api
      .post(apiUrl, { page: 0, sizePerPage: 10 })
      .then((res) => {
        setOptions(res.data.content || res.data);
      })
      .catch(() => {
        console.error("Failed to load dropdown:", name);
      });
  }, [apiUrl]);

  return (
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full p-3 border rounded"
    >
      <option value="">{placeholder || "-- Select --"}</option>

      {options.map((opt) => (
        <option key={opt.id} value={opt.identifier}>
          {opt.identifier}
        </option>
      ))}
    </select>
  );
};

export default SingleDropdown;
