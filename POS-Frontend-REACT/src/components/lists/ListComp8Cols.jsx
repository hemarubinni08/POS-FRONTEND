import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const ListComp8Cols = ({
  title,
  entity,
  columns = [],
  addPath,
  editPath
}) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState(null);

  const [pagination, setPagination] = useState({
    page: 0,
    sizePerPage: 10,
    sortDirection: "ASCENDING",
    sortField: "id"
  });

  const currentPage = pagination.page;

  /* ===== FETCH LIST ===== */
  useEffect(() => {
    fetchData();
  }, [entity, pagination]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `http://localhost:8080/api/${entity}/list`,
        pagination,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (res.data) {
        // Handle array response
        if (Array.isArray(res.data)) {
          setData(res.data);
          const backendTotalPages = res.data[0]?.totalPages;
          setTotalPages(backendTotalPages && backendTotalPages > 0 ? backendTotalPages : 1);
        }
        // Handle WsDto response
        else {
          setData(res.data.dtoList || []);
          setTotalPages(res.data.totalPages && res.data.totalPages > 0 ? res.data.totalPages : 1);
        }
      }
    } catch (err) {
      setError(`Failed to load ${entity.toLowerCase()} records`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== DELETE ===== */
  const handleDelete = async (identifier) => {
    if (!window.confirm(`Delete this record?\n\nID: ${identifier}`)) return;

    try {
      setDeleting(identifier);
      const res = await axios.get(
        `http://localhost:8080/api/${entity}/delete`,
        {
          params: { identifier },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      if (res.data === true) {
        setData(prev => prev.filter(item => item.identifier !== identifier));
        if (data.length === 1 && currentPage > 0) {
          goToPage(currentPage - 1);
        }
      } else {
        setError("Failed to delete record");
      }
    } catch (err) {
      setError("Delete operation failed");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  /* ===== TOGGLE STATUS ===== */
  const handleToggleStatus = async (item) => {
    try {
      await axios.post(
        `http://localhost:8080/api/${entity}/toggle`,
        null,
        {
          params: { identifier: item.identifier },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setData(prev =>
        prev.map(row =>
          row.identifier === item.identifier
            ? { ...row, status: !row.status }
            : row
        )
      );
    } catch (err) {
      setError("Failed to update status");
      console.error(err);
    }
  };

  /* ===== PAGINATION ===== */
  const goToPage = (pageIndex) => {
    setPagination(prev => ({ ...prev, page: pageIndex }));
  };

  const handleSizeChange = (e) => {
    setPagination(prev => ({
      ...prev,
      sizePerPage: parseInt(e.target.value, 10),
      page: 0
    }));
  };

  const getVisiblePages = () => {
    let start = currentPage - 1;
    if (start < 0) start = 0;
    if (start + 3 > totalPages) start = totalPages - 3;
    if (start < 0) start = 0;
    return Array.from({ length: Math.min(3, totalPages) }, (_, i) => start + i);
  };

  const formatEditPath = (id) => {
    if (!editPath) return "#";
    const cleanEditPath = editPath.endsWith("/") ? editPath.slice(0, -1) : editPath;
    return `${cleanEditPath}/${id}`;
  };

  /* ===== SEARCH FILTER ===== */
  const filteredData = data.filter(item => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return columns.some(col =>
      String(item[col.key] || "")
        .toLowerCase()
        .includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">

      {/* HEADER */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
            <p className="text-sm text-slate-600 mt-2">
              Manage and control your {entity.toLowerCase()} records
            </p>
          </div>
          <button
            onClick={() => navigate(addPath)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-md"
          >
            <Plus size={18} />
            Add {entity}
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>

      {/* ERROR ALERT */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          {error}
        </div>
      )}

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">

        {/* TABLE HEADER */}
        <div className="grid gap-4 bg-slate-50 border-b border-slate-200 px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider sticky top-0 z-10"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)) 120px`
          }}
        >
          {columns.map(col => (
            <div key={col.key} className="truncate">
              {col.label}
            </div>
          ))}
          <div className="text-right">Actions</div>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y divide-slate-100 flex-1">

          {/* LOADING STATE */}
          {loading ? (
            [...Array(pagination.sizePerPage)].map((_, i) => (
              <div key={i} className="grid gap-4 px-6 py-4 animate-pulse"
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)) 120px`
                }}
              >
                {[...Array(columns.length + 1)].map((_, j) => (
                  <div key={j} className="h-4 bg-slate-100 rounded w-3/4" />
                ))}
              </div>
            ))
          ) : filteredData.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-sm">
                {searchTerm ? "No records match your search" : `No ${entity.toLowerCase()} records found`}
              </p>
            </div>
          ) : (
            filteredData.map(item => (
              <div
                key={item.identifier || item.id}
                className="grid gap-4 px-6 py-4 text-sm text-slate-700 hover:bg-slate-50 transition-colors items-center"
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)) 120px`
                }}
              >
                {/* DATA CELLS */}
                {columns.map(col => (
                  <div key={col.key} className="truncate">
                    {col.key === "status" ? (
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                          item.status
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </button>
                    ) : col.render ? (
                      col.render(item[col.key], item)
                    ) : Array.isArray(item[col.key]) ? (
                      <div className="flex flex-wrap gap-1">
                        {item[col.key].map((val, idx) => (
                          <span key={idx} className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {val}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className={item[col.key] ? "text-slate-900 font-medium" : "text-slate-400"}>
                        {item[col.key] ?? "-"}
                      </span>
                    )}
                  </div>
                ))}

                {/* ACTIONS */}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate(formatEditPath(item.identifier || item.id))}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.identifier || item.id)}
                    disabled={deleting === item.identifier}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* PAGINATION FOOTER */}
        {!loading && data.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-4">

            {/* ROWS PER PAGE */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-600">Rows per page:</span>
              <select
                value={pagination.sizePerPage}
                onChange={handleSizeChange}
                className="text-xs px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 font-semibold cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* PAGE INFO & NAVIGATION */}
            <div className="flex items-center gap-6">
              <span className="text-xs text-slate-600">
                Page <span className="font-bold text-slate-900">{currentPage + 1}</span> of{" "}
                <span className="font-bold text-slate-900">{totalPages}</span> •{" "}
                <span className="font-bold text-slate-900">{data.length}</span> total
              </span>

              <div className="flex items-center gap-1">
                {/* PREVIOUS */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
                    currentPage === 0
                      ? "opacity-50 cursor-not-allowed bg-slate-100 border-slate-200"
                      : "bg-white border-slate-300 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                {/* PAGE NUMBERS */}
                {getVisiblePages().map(pageIndex => (
                  <button
                    key={pageIndex}
                    onClick={() => goToPage(pageIndex)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-colors ${
                      currentPage === pageIndex
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                ))}

                {/* NEXT */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
                    currentPage === totalPages - 1
                      ? "opacity-50 cursor-not-allowed bg-slate-100 border-slate-200"
                      : "bg-white border-slate-300 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ListComp8Cols;