import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Layout from "../../Component/Layout";

function UserList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async (currentPage = 0) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/list", {
        page: currentPage,
        sizePerPage: 5,
        sortDirection: "ASC",
        sortField: "username",
      });

      const result = response.data || {};
      setData(result.dtoList ?? result.content ?? result ?? []);
      setTotalPages(result.totalPages ?? 0);
      setTotalRecords(result.totalRecords ?? 0);
    } catch (error) {
      console.error("Fetch users failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleDelete = async (username) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axiosInstance.get("/user/delete", {
        params: { username },
      });
      fetchData(page);
    } catch (error) {
      console.error("Delete user failed:", error);
    }
  };

  return (
    <Layout>
      <div className="w-full max-w-full">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
            <p className="mt-1 text-sm text-slate-500">Browse and manage POS users.</p>
          </div>

          <button
            onClick={() => navigate("/profile/user/add")}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700"
          >
            + Add User
          </button>
        </div>

        {loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading users...
          </div>
        )}

        {!loading && data.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
            No users available.
          </div>
        )}

        {!loading && data.length > 0 && (
          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">ID</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Username</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Name</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Phone</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-[0.08em]">Roles</th>
                  <th className="px-4 py-3 text-right font-semibold uppercase tracking-[0.08em]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.username} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-4">{item.id || "-"}</td>
                    <td className="px-4 py-4">{item.username || "-"}</td>
                    <td className="px-4 py-4">{item.name || "-"}</td>
                    <td className="px-4 py-4">{item.phoneNo || "-"}</td>
                    <td className="px-4 py-4">{item.roles?.join(", ") || "-"}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => navigate(`/profile/user/edit/${item.username}`)}
                          className="rounded-xl bg-amber-400 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.username)}
                          className="rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Showing page {page + 1} of {totalPages} · {totalRecords} total records
            </p>
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
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default UserList;
