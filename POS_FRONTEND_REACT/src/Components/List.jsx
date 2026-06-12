import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api";

const List = ({ urlName, keys }) => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 0,
    sizePerPage: 5,
  });

  const numbers =
    totalPages > 0
      ? Array.from({ length: totalPages }, (_, i) => i + 1)
      : [];

  // ✅ ONLY ONE EFFECT (fix duplicate API call)
  useEffect(() => {
    fetchData();
  }, [pagination]);

  // ✅ FILTER OUT STATUS FROM NORMAL COLUMNS
  const displayKeys = keys.filter((k) => k !== "status");

  // ✅ FETCH DATA
  const fetchData = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);

    api
      .post(`/${urlName}/list`, pagination)
      .then((res) => {
        setData(res.data.dtoList || []);
        setTotalPages(res.data.totalPages || 0);
      })
      .catch(() => {
        setMessage("❌ Failed to load data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ✅ TOGGLE STATUS
  const handleToggle = (row) => {
    const value = row.identifier || row.username;

    api
      .post(
        `/${urlName}/toggle`,
        {},
        {
          params: {
            identifier: value,
            status: !row.status,
          },
        }
      )
      .then(() => {
        setData((prev) =>
          prev.map((item) =>
            (item.identifier || item.username) === value
              ? { ...item, status: !row.status }
              : item
          )
        );

        setMessage("✅ Status updated");

        setTimeout(() => setMessage(""), 3000);
      })
      .catch(() => {
        setMessage("❌ Toggle failed");
      });
  };

  // ✅ DELETE (with page fix)
  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );

    if (!confirmDelete) return;

    const value = row.identifier || row.username;

    api
      .get(`/${urlName}/delete`, {
        params: { identifier: value },
      })
      .then(() => {
        setMessage("✅ Deleted successfully");

        setPagination((prev) => ({
          ...prev,
          page:
            prev.page > 0 && data.length === 1
              ? prev.page - 1
              : prev.page,
        }));
      })
      .catch(() => {
        setMessage("❌ Delete failed");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-6">
      <div className="bg-white w-full max-w-6xl p-8 rounded-2xl shadow-xl overflow-x-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {urlName.toUpperCase()} LIST
          </h2>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/${urlName}/add`)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
            >
              + Add
            </button>

            <button
              onClick={() => navigate("/dashboard1")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Home
            </button>
          </div>
        </div>

        {/* MESSAGE */}
        {message && (
          <div
            className={`mb-4 text-center text-sm ${
              message.includes("✅")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        {/* LOADING / TABLE */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No data found
          </div>
        ) : (
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="p-3 border">Sl</th>

                {displayKeys.map((key, index) => (
                  <th key={index} className="p-3 border">
                    {key}
                  </th>
                ))}

                {keys.includes("status") && (
                  <th className="p-3 border">Status</th>
                )}

                <th className="p-3 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => (
                <tr
                  key={row.identifier || row.username}
                  className="text-center border-b hover:bg-gray-50"
                >
                  {/* ✅ FIXED SERIAL NUMBER */}
                  <td className="p-3 border">
                    {pagination.page * pagination.sizePerPage + index + 1}
                  </td>

                  {displayKeys.map((key, idx) => (
                    <td key={idx} className="p-3 border">
                      {row[key]}
                    </td>
                  ))}

                  {/* ✅ STATUS COLUMN */}
                  {keys.includes("status") && (
                    <td className="p-3 border">
                      <div className="flex justify-center items-center gap-2">

                        <label className="cursor-pointer">
                          <input
                            type="checkbox"
                            checked={row.status}
                            onChange={() => handleToggle(row)}
                            className="hidden"
                          />

                          <div
                            className={`w-11 h-6 flex items-center rounded-full p-1 ${
                              row.status
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            <div
                              className={`bg-white w-4 h-4 rounded-full transform ${
                                row.status
                                  ? "translate-x-5"
                                  : ""
                              }`}
                            />
                          </div>
                        </label>

                        <span
                          className={`text-xs font-bold ${
                            row.status
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {row.status ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>
                    </td>
                  )}

                  {/* ACTIONS */}
                  <td className="p-3 border">
                    <button
                      onClick={() =>
                        navigate(
                          `/${urlName}/get?identifier=${
                            row.identifier || row.username
                          }`
                        )
                      }
                      className="mx-2 text-blue-600 hover:scale-110"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => handleDelete(row)}
                      className="mx-2 text-red-500 hover:scale-110"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: num - 1,
                }))
              }
              className={`px-3 py-1 rounded-lg border text-sm ${
                pagination.page === num - 1
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default List;