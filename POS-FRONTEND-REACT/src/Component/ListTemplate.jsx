import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const CommonList = ({
  title,
  columns,
  urlName,
  showStatus = false,
  editKey = "identifier",
  deleteKey = "id",
  deleteParam = "id",
  rowKey = "id",
  addButtonLabel,
  showAddButton = true,
  pageSize ,
  sortField = "identifier",
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const BASE_URL = "http://localhost:8080/api";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(page);
  }, [page, rowsPerPage]);

  const fetchData = async (currentPage = 0) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}/${urlName}/list`,
          {
          page: currentPage,
          sizePerPage: rowsPerPage,
          sortDirection: "ASC",
          sortField,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const responseData = res.data || {};
      const list = responseData.dtoList ?? responseData.content ?? responseData ?? [];
      setData(Array.isArray(list) ? list : []);
      setTotalPages(responseData.totalPages ?? 0);
      setTotalRecords(responseData.totalRecords ?? (Array.isArray(list) ? list.length : 0));
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };
 
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
 
    try {
      await axios.get(
        `${BASE_URL}/${urlName}/delete?${deleteParam}=${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      fetchData(page);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };
 
  const toggleStatus = async (identifier, status) => {
    try {
      await axios.post(
        `${BASE_URL}/${urlName}/changeStatus`,
        { identifier, status },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      fetchData(page);
    } catch (err) {
      console.error("Toggle Error:", err);
    }
  };
 
  return (
    <div className="w-full max-w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">
            Browse and manage records for your POS system.
          </p>
        </div>
 
        {showAddButton && (
          <button
            onClick={() => navigate(`/profile/${urlName}/add`)}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700"
          >
            + Add {addButtonLabel || title.replace(/\s+Management$/, "")}
          </button>
        )}
      </div>
 
      {loading && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          Loading records...
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
          No records available.
        </div>
      )}
 
      {!loading && data.length > 0 && (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-900 text-white">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-semibold uppercase tracking-[0.08em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item[rowKey] ?? item.identifier ?? item.id} className="border-t border-slate-200 hover:bg-slate-50">
                  {columns.map((col, i) => (
                    <td key={i} className="px-4 py-4 align-top">
                      {col.field === "status" && showStatus ? (
                        <button
                          onClick={() => toggleStatus(item.identifier, !item.status)}
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${
                            item.status ? "bg-emerald-500" : "bg-rose-500"
                          }`}
                        >
                          {item.status ? "Active" : "Inactive"}
                        </button>
                      ) : col.render ? (
                        col.render(item)
                      ) : (
                        item[col.field] || "-"
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-4 align-top space-x-2 text-right">
                    <button
                      onClick={() => navigate(`/profile/${urlName}/edit/${item[editKey]}`)}
                      className="rounded-xl bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item[deleteKey])}
                      className="rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Showing page {Math.min(page + 1, Math.max(totalPages, 1))} of {Math.max(totalPages, 1)}{typeof totalRecords === "number" ? ` - ${totalRecords} total records` : ""}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page + 1 >= Math.max(totalPages, 1)}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default CommonList;

