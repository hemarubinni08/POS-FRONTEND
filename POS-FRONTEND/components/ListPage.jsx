import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListPage = ({ keys, modelName, onEdit, setListUpdateHandler }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [listData, setListData] = useState([]);
  const [message, setMessage] = useState("");

  const paginationDto = {
    page: 0,
    sizePerPage: 50,
  };

  const fetchList = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/${modelName}/list`,
        paginationDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      setListData(res.data || []);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load data");
    }
  };

  const handleToggleStatus = (rowIndex) => {
    const updatedList = [...listData];

    updatedList[rowIndex].status = !updatedList[rowIndex].status;

    setListData(updatedList);

    axios.post(`http://localhost:8080/api/${modelName}/toggle`, {
      identifier: updatedList[rowIndex].identifier,
      status: updatedList[rowIndex].status,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  };

  const handleDelete = async (identifier) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.get(
          `http://localhost:8080/api/${modelName}/delete?identifier=${identifier}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setMessage(
          `${modelName.charAt(0).toUpperCase() + modelName.slice(1)} deleted successfully`
        );

        setTimeout(() => setMessage(""), 3000);

        fetchList();

      } catch (err) {
        console.error(err);
        setMessage("Delete failed");
      }
    }
  };

  const handleUpdateSuccess = (updatedItem) => {
    setListData((prev) =>
      prev.map((item) =>
        item.identifier === updatedItem.identifier
          ? updatedItem
          : item
      )
    );
  };

  useEffect(() => {
    fetchList();
  }, [modelName]);

  useEffect(() => {
    setListUpdateHandler?.(() => handleUpdateSuccess);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {modelName.charAt(0).toUpperCase() + modelName.slice(1)} List
        </h2>

        {/* Toast */}
        {message && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-lg px-6 py-3 rounded-xl shadow-lg border border-white/40 text-sm font-medium text-gray-800">
            {message}
          </div>
        )}

        {/* Table */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">

          {listData.length === 0 ? (
            <div className="text-center text-gray-600">
              No data found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">

                <thead>
                  <tr className="border-b">
                    {keys.map((key) => (
                      <th
                        key={key}
                        className="text-left py-3 px-3"
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {listData.map((item, rowIndex) => (
                    <tr
                      key={item.identifier}
                      className="border-b hover:bg-blue-100/40 transition"
                    >
                      {keys.map((key, colIndex) =>
                        key === "status" ? (
                          <td key={colIndex} className="py-3 px-3">
                            <label className="relative inline-flex items-center cursor-pointer group">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={item[key] === true}
                                onChange={() => handleToggleStatus(rowIndex)}
                              />

                              <div
                                className="
                                  w-11 h-6 bg-gray-300 rounded-full
                                  peer-checked:bg-green-500
                                  transition-colors duration-300
                                  relative
                                "
                              >
                                <div
                                  className="
                                    absolute top-0.5 left-0.5
                                    w-5 h-5 bg-white rounded-full
                                    transition-all duration-300
                                    group-has-[input:checked]:translate-x-5
                                  "
                                />
                              </div>
                            </label>
                          </td>
                        ) : (
                          <td key={colIndex} className="py-3 px-3">
                            {String(item[key])}
                          </td>
                        )
                      )}

                      {/* Action Buttons */}
                      <td className="py-3 px-3">
                        <div className="flex gap-2">
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow"
                            onClick={() => onEdit(item.identifier, fetchList)}
                          >
                            Update
                          </button>

                          <button
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow"
                            onClick={() => handleDelete(item.identifier)}
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
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            onClick={() => navigate("/home")}
          >
            Home
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
            onClick={() => navigate(`/${modelName}/add`)}
          >
            + Add {modelName.charAt(0).toUpperCase() + modelName.slice(1)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListPage;
