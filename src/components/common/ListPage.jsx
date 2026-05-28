import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const ListPage = ({
  modelName,
  keys = [],
  enableToggle = false,
}) => {

  const navigate = useNavigate();

  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* PAGINATION */

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const sizePerPage = 10;

  /* LOAD DATA */

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

      alert("Failed to load data");

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    if (modelName) {
      loadData(page);
    }

  }, [modelName, page]);

  /* DELETE */

  const handleDelete = async (identifier) => {

    if (!window.confirm("Delete this item?")) {
      return;
    }

    try {

      await api.post(`/${modelName}/delete`, {
        identifier
      });

      loadData(page);

    } catch (err) {

      console.log("Delete error:", err);

      alert("Delete failed");
    }
  };

  /* TOGGLE */

  const handleToggle = async (item, index) => {

    try {

      await api.get(`/${modelName}/toggle`, {
        params: {
          identifier: item.identifier
        }
      });

      const updated = [...listData];

      updated[index].status = !updated[index].status;

      setListData(updated);

    } catch (err) {

      console.log("Toggle error:", err);

      alert("Toggle failed");
    }
  };

  if (!modelName) {

    return (
      <div className="p-5 text-red-600">
        modelName is missing
      </div>
    );
  }

  return (

    <div className="bg-[#f4f6fb] min-h-screen p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold text-gray-800">

          {modelName.charAt(0).toUpperCase() +
            modelName.slice(1)} List

        </h2>

        <button
          onClick={() => navigate(`/${modelName}/add`)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add
        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="text-center py-10 text-gray-500">
          Loading...
        </div>
      )}

      {/* EMPTY */}

      {!loading && listData.length === 0 && (

        <div className="text-center py-10 text-gray-500">
          No Data Found
        </div>
      )}

      {/* TABLE */}

      {!loading && listData.length > 0 && (

        <>
          <div className="bg-white shadow rounded-lg overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-gray-900 text-white">

                <tr>

                  {keys.map((k) => (

                    <th
                      key={k}
                      className="text-left p-3 capitalize"
                    >
                      {k}
                    </th>

                  ))}

                  {enableToggle && (

                    <th className="p-3 text-center">
                      Status
                    </th>
                  )}

                  <th className="p-3 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {listData.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >

                    {keys.map((k) => (

                      <td
                        key={k}
                        className="p-3"
                      >

                        {Array.isArray(item?.[k])
                          ? item[k].join(", ")
                          : String(item?.[k] ?? "-")}

                      </td>

                    ))}

                    {/* TOGGLE */}

                    {enableToggle && (

                      <td className="p-3 text-center">

                        <div className="flex justify-center">

                          <button
                            onClick={() =>
                              handleToggle(item, index)
                            }
                            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 ${
                              item.status
                                ? "bg-green-500"
                                : "bg-gray-400"
                            }`}
                          >

                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                                item.status
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />

                          </button>

                        </div>

                      </td>
                    )}

                    {/* ACTIONS */}

                    <td className="p-3">

                      <div className="flex gap-2 justify-center">

                        <button
                          onClick={() =>
                            navigate(
                              `/${modelName}/edit/${item.identifier}`
                            )
                          }
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(item.identifier)
                          }
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

          {/* PAGINATION */}

          <div className="flex justify-center items-center gap-4 mt-6">

            <button
              onClick={() =>
                setPage((p) => Math.max(p - 1, 0))
              }
              disabled={page === 0}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-medium">

              Page {page + 1} / {totalPages}

            </span>

            <button
              onClick={() =>
                setPage((p) => p + 1)
              }
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

export default ListPage;