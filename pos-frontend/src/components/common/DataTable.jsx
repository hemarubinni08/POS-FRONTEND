import React, { useEffect, useState } from "react";
import api from "../../api/api";
import Pagination from "./Pagination";
import TableToolbar from "./TableToolbar";
import { useNavigate } from "react-router-dom";

/* ✅ Debounce Hook */
const useDebounce = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const DataTable = ({
  title,
  apiUrl,
  columns,
  roles = [],
  userRole = "",
  deleteApi,
  toggleApi,
  basePath = "",
  idField = "id",
  showStatus = true,
}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [page, setPage] = useState(1);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [sortField, setSortField] = useState("identifier");
  const [sortDir, setSortDir] = useState("desc");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [page, debouncedSearch, sortField, sortDir]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        page: page - 1,
        sizePerPage: size,
        sortField,
        sortDirection: sortDir,
        search: debouncedSearch || "",
      };

      const res = await api.post(apiUrl, payload);
      const response = res.data;

      setData(response.dtoList || []);
      setTotalPages(response.totalPage || 1);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (!field) return;
    setSortField(field);
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleDelete = async (row) => {
    if (!deleteApi) return;
    const id = row[idField];

    if (!window.confirm("Delete this record?")) return;

    await api.get(deleteApi, { params: { [idField]: id } });
    fetchData();
  };

  const handleToggle = async (row) => {
    if (!toggleApi) return;
    const id = row[idField];

    await api.get(toggleApi, { params: { [idField]: id } });
    fetchData();
  };

  return (
    <div className="text-white">

      <TableToolbar
        title={title}
        search={search}
        setSearch={setSearch}
        onAdd={() => navigate(`${basePath}/add`)}
      />

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-md">

        <table className="w-full text-sm">

          {/* HEADER */}
          <thead className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 text-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-4 py-3 cursor-pointer text-left"
                >
                  {col.label}
                  {sortField === col.key && (
                    <span className="ml-1">
                      {sortDir === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
              {showStatus && <th className="px-4">Status</th>}
              {roles.includes(userRole) && <th className="px-4">Actions</th>}
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="divide-y divide-gray-700">

            {loading ? (
              <tr>
                <td colSpan="100%" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="100%" className="text-center text-red-400 py-4">
                  {error}
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <tr key={row[idField] || index} className="hover:bg-gray-700">

                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {row[col.key]}
                    </td>
                  ))}

                  {/* STATUS */}
                  {/* ✅ STATUS */}
{showStatus && (
  <td className="px-4 py-3">
    {toggleApi ? (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={row.status === true}
          onChange={() => handleToggle(row)}
          className="sr-only peer"
        />

        {/* ✅ SLIDER */}
        <div
          className="
            w-11 h-6 bg-gray-300 rounded-full peer
            peer-checked:bg-blue-600
            relative transition-all duration-300
            after:content-['']
            after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:h-5 after:w-5 after:rounded-full
            after:transition-all after:duration-300
            peer-checked:after:translate-x-5
          "
        ></div>
      </label>
    ) : (
      <span
        className={`px-2 py-1 text-xs rounded 
        ${row.status ? "bg-green-600" : "bg-red-600"}`}
      >
        {row.status ? "ACTIVE" : "INACTIVE"}
      </span>
    )}
  </td>
)}


                  {/* ACTIONS */}
                  {roles.includes(userRole) && (
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() =>
                          navigate(`${basePath}/edit/${row[idField]}`)
                        }
                        className="px-3 py-1 text-xs bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      {deleteApi && (
                        <button
                          onClick={() => handleDelete(row)}
                          className="px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="100%" className="text-center py-6">
                  No data available
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default DataTable;