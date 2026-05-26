import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const SimpleListPage = ({
  modelName,
  keys = [],
  hideAddButton = false
}) => {

  const navigate = useNavigate();

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const sizePerPage = 10;

  const loadData = async (pageNo = page) => {
    try {
      setLoading(true);

      const res = await api.post(`/${modelName}/list`, {
        page: pageNo,
        sizePerPage,
      });

      setListData(res.data.dtoList || []);
      setTotalPages(res.data.totalPages || 0);

    } catch (err) {
      console.log("List error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modelName) loadData(page);
  }, [modelName, page]);

  const handleDelete = async (identifier) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await api.post(`/${modelName}/delete`, { identifier });
      loadData(page);
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  if (!modelName) {
    return <div className="p-5 text-red-600">modelName is missing</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold text-gray-800">
          {modelName.charAt(0).toUpperCase() + modelName.slice(1)} List
        </h2>

        {/* CONDITIONAL ADD BUTTON */}
        {!hideAddButton && (
          <button
            onClick={() => navigate(`/${modelName}/add`)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add
          </button>
        )}

      </div>

      {/* LOADING */}
      {loading && <div>Loading...</div>}

      {/* EMPTY */}
      {!loading && listData.length === 0 && (
        <div className="text-gray-500">No Data Found</div>
      )}

      {/* TABLE */}
      {!loading && listData.length > 0 && (
        <>
          <div className="bg-white shadow rounded-lg overflow-x-auto">

            <table className="w-full text-sm border">

              <thead className="bg-gray-900 text-white">
                <tr>
                  {keys.map((k) => (
                    <th key={k} className="text-left p-3 capitalize">
                      {k}
                    </th>
                  ))}
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {listData.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">

                    {keys.map((k) => (
                      <td key={k} className="p-3">
                        {Array.isArray(item?.[k])
                          ? item[k].join(", ")
                          : String(item?.[k] ?? "-")}
                      </td>
                    ))}

                    <td className="p-3 flex gap-2">

                      <button
                        onClick={() =>
                          navigate(`/${modelName}/edit/${item.identifier}`)
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item.identifier)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-4 mt-6">

            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-medium">
              Page {page + 1} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages - 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </>
      )}

    </div>
  );
};

export default SimpleListPage;