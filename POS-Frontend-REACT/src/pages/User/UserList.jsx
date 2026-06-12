import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    sizePerPage: 10,
    sortDirection: "DESC",
    sortField: "id"
  });
  const [totalPages, setTotalPages] = useState(1);

  const API_BASE = "http://localhost:8080";
  const token = localStorage.getItem("token");

  /* ===== FETCH USERS ===== */
  useEffect(() => {
    fetchUsers();
  }, [pagination]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${API_BASE}/api/user/list`,
        pagination,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (Array.isArray(res.data)) {
        setUsers(res.data);
        setTotalPages(res.data[0]?.totalPages || 1);
      } else {
        setUsers(res.data.dtoList || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===== DELETE USER ===== */
  const handleDelete = async (username) => {
    if (!window.confirm(`Delete user: ${username}?`)) return;

    try {
      await axios.get(
        `${API_BASE}/api/user/delete`,
        {
          params: { username: username },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(users.filter(u => u.username !== username));
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ===== TOGGLE STATUS ===== */
  const handleToggleStatus = async (user) => {
    try {
      await axios.post(
        `${API_BASE}/api/user/toggle`,
        {
          params: { username: user.username },
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUsers(users.map(u => 
        u.username === user.username ? { ...u, status: !u.status } : u
      ));
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  /* ===== PAGINATION ===== */
  const currentPage = pagination.page;
  
  const handlePageChange = (pageIndex) => {
    setPagination(prev => ({ ...prev, page: pageIndex }));
  };

  const handleSizeChange = (e) => {
    setPagination(prev => ({
      ...prev,
      sizePerPage: parseInt(e.target.value),
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

  /* ===== FILTER ===== */
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phoneNo?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Users</h1>
            <p className="text-sm text-slate-600 mt-2">Manage user accounts and access permissions</p>
          </div>
          <button
            onClick={() => navigate("/users/add")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors shadow-md"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
        
        {/* TABLE HEADER */}
        <div className="grid grid-cols-8 gap-4 bg-slate-50 border-b border-slate-200 px-6 py-4 text-xs font-bold text-slate-600 uppercase tracking-wider sticky top-0">
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Roles</div>
          <div>Status</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y divide-slate-100 flex-1">
          {loading ? (
            [...Array(pagination.sizePerPage)].map((_, i) => (
              <div key={i} className="grid grid-cols-8 gap-4 px-6 py-4 animate-pulse">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 bg-slate-100 rounded w-3/4" />
                ))}
              </div>
            ))
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm">No users found</p>
            </div>
          ) : (
            filteredUsers.map(user => (
              <div key={user.id} className="grid grid-cols-8 gap-4 px-6 py-4 text-sm text-slate-700 hover:bg-slate-50 transition-colors items-center">
                
                {/* NAME */}
                <div className="font-semibold text-slate-900">{user.name}</div>

                {/* EMAIL */}
                <div className="text-blue-600 truncate">{user.username}</div>

                {/* PHONE */}
                <div>{user.phoneNo || "-"}</div>

                {/* ROLES */}
                <div className="flex flex-wrap gap-1">
                  {user.roles && user.roles.length > 0 ? (
                    user.roles.map(role => (
                      <span key={role} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {role.replace("ROLE_", "").replace("_", " ")}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">No roles</span>
                  )}
                </div>

                {/* STATUS */}
                <div>
                  <button
                    onClick={() => handleToggleStatus(user)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                      user.status
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {user.status ? "Active" : "Inactive"}
                  </button>
                </div>

                {/* ACTIONS */}
                <div className="col-span-3 flex justify-end gap-2">
                  <button
                    onClick={() => navigate(`/users/edit/${user.username}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.username)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {!loading && users.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            
            {/* Rows Per Page */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-600">Rows per page:</span>
              <select
                value={pagination.sizePerPage}
                onChange={handleSizeChange}
                className="text-xs px-2 py-1 border border-slate-300 rounded-md bg-white focus:outline-none focus:border-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Page Navigation */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-600">
                Page <span className="font-semibold text-slate-900">{currentPage + 1}</span> of <span className="font-semibold text-slate-900">{totalPages}</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${
                    currentPage === 0
                      ? "opacity-50 cursor-not-allowed bg-slate-100 border-slate-200"
                      : "bg-white border-slate-300 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  ←
                </button>
                {getVisiblePages().map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs font-bold transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors ${
                    currentPage === totalPages - 1
                      ? "opacity-50 cursor-not-allowed bg-slate-100 border-slate-200"
                      : "bg-white border-slate-300 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  →
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default UserList;