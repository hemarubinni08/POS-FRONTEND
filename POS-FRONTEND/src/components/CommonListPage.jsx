import React, { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { Home, Pencil, Trash2, Plus } from "lucide-react";

const CommonListPage = ({
  title = "List",

  apiUrl,
  method = "POST",
  payload = {},

  columns = [],

  deleteApi,
  deleteParam = "identifier",

  editRoute,
  addRoute,

  showStatus = false,
  toggleApi,
  toggleParam = "identifier",
  toggleField = "status",
  toggleMethod = "POST",

  sortField = "id",
  sortOrder = "ASC",

  itemsPerPage = 5,
}) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const [pagination, setPagination] = useState({
    page: 0,
    sizePerPage: itemsPerPage,
  });

  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const triggerToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((p) => ({ ...p, visible: false }));
    }, 2500);
  };

  // ================= FETCH =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await api({
        method,
        url: apiUrl,
        data: {
          ...payload,
          page: pagination.page,
          sizePerPage: pagination.sizePerPage,
          sortField,
          sortDirection: sortOrder,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data?.dtoList || []);
      setTotalPages(res.data?.totalPage || 0);
      setTotalRecords(res.data?.totalRecords || 0);
    } catch (err) {
      triggerToast("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination]);

  // ================= SEARCH =================
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.some((col) => {
        const value = item[col.field];
        if (value === null || value === undefined) return false;
        return value.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search, columns]);

  // ================= DELETE =================
  const handleDelete = async (row) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await api.get(deleteApi, {
        params: {
          [deleteParam]: row[deleteParam],
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      triggerToast("Deleted successfully");
      fetchData();
    } catch {
      triggerToast("Delete failed", "error");
    }
  };

  // ================= EDIT =================
  const handleEdit = (row) => {
    navigate(editRoute.replace(":identifier", row[deleteParam]));
  };

  // ================= TOGGLE =================
  const handleToggleStatus = async (row) => {
    const identifier = row[deleteParam];

    try {
      const res = await api({
        method: toggleMethod,
        url: toggleApi.trim(),
        params: { [toggleParam]: identifier },
        headers: { Authorization: `Bearer ${token}` },
      });

      setData((prev) =>
        prev.map((item) =>
          item[deleteParam] === identifier
            ? { ...item, ...res.data }
            : item
        )
      );

      triggerToast("Status updated");
    } catch {
      triggerToast("Toggle failed", "error");
    }
  };

  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* ================= TOAST ================= */}
      {toast.visible && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {toast.message}
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">
            Manage your data efficiently
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/home")}
            className="p-2 bg-white border rounded-lg shadow-sm hover:bg-slate-50"
          >
            <Home size={18} />
          </button>

          {addRoute && (
            <button
              onClick={() => navigate(addRoute)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm"
            >
              <Plus size={16} /> Add
            </button>
          )}
        </div>
      </div>

      {/* ================= TOOLBAR ================= */}
      <div className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm">
        <input
          className="w-full max-w-md border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
          placeholder="Search records..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="text-sm text-slate-500 ml-4">
          {totalRecords} records
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl mt-4 overflow-hidden shadow-sm relative">

        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm text-slate-600">
            Loading...
          </div>
        )}

        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-white sticky top-0">
            <tr>
              {columns.map((col, i) => (
                <th key={i} className="text-left p-3">
                  {col.header}
                </th>
              ))}
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, i) => (
              <tr key={i} className="border-t hover:bg-slate-50 transition">

                {columns.map((col, j) => (
                  <td key={j} className="p-3">

                    {/* ================= MODERN TOGGLE ================= */}
                    {col.field === toggleField && showStatus ? (
                      <button
                        onClick={() => handleToggleStatus(row)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                          row[toggleField]
                            ? "bg-emerald-500"
                            : "bg-slate-300"
                        }`}
                      >
                        <span
                          className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                            row[toggleField]
                              ? "translate-x-5"
                              : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <span className="text-slate-700">
                        {String(row[col.field] ?? "")}
                      </span>
                    )}

                  </td>
                ))}

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleEdit(row)}>
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(row)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION (MODERN UI) ================= */}
      {totalPages > 0 && (
        <div className="mt-4 bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm">

          <div className="text-sm text-slate-600">
            Page <b>{pagination.page + 1}</b> of <b>{totalPages}</b>
          </div>

          <div className="flex gap-2 items-center">

            <button
              disabled={pagination.page === 0}
              onClick={() =>
                setPagination((p) => ({ ...p, page: p.page - 1 }))
              }
              className="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
            >
              Prev
            </button>

            <div className="flex gap-1">
              {numbers.map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    setPagination((p) => ({ ...p, page: num - 1 }))
                  }
                  className={`px-3 py-1 rounded-lg text-sm border transition ${
                    pagination.page === num - 1
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white hover:bg-slate-100"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              disabled={pagination.page >= totalPages - 1}
              onClick={() =>
                setPagination((p) => ({ ...p, page: p.page + 1 }))
              }
              className="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
            >
              Next
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default CommonListPage;