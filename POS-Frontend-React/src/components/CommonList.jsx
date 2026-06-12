import React, { useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";
import { useNavigate } from "react-router-dom";


const CommonList = ({
  title,
  columns,
  urlName,
  showStatus = false,
}) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sizePerPage] = useState(2);

  const navigate = useNavigate();

  const getItemValue = (item) => {
    if (urlName === "user") {
      return item.username;
    }

    return item.identifier ?? item.id;
  };

  const getDeleteParamName = () => (urlName === "user" ? "username" : "identifier");

  // FETCH DATA
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {

    setLoading(true);
    setError("");

    try {

      const res = await axiosInstance.post(

        `/${urlName}/list`,

        {
          page: currentPage,
          sizePerPage: sizePerPage,
          sortDirection: "ASC",
          sortField: "identifier",
        }

      );

      console.log("LIST RESPONSE:", res.data);

      // BACKEND RESPONSE
      // dtoList
      // totalPages
      // totalRecords

      setData(res.data.dtoList || (Array.isArray(res.data) ? res.data : []));

      setTotalPages(res.data.totalPages || 0);

    } catch (err) {

      console.error("Fetch Error:", err);
      setError(err?.response?.data?.message || err.message || "Unable to fetch data.");

    } finally {

      setLoading(false);

    }
  };

  // DELETE
  const deleteItem = async (itemValue) => {

    const confirmDelete = window.confirm(
      "Delete this item?"
    );

    if (!confirmDelete) return;

    try {

      const response = await axiosInstance.get(

        `/${urlName}/delete?${getDeleteParamName()}=${encodeURIComponent(itemValue)}`

      );

      if (response.data === false) {
        setError(`Unable to delete ${urlName}.`);
        return;
      }

      fetchData();

    } catch (err) {

      console.error("Delete Error:", err);
      setError(err?.response?.data?.message || err.message || "Unable to delete item.");

    }
  };

  // TOGGLE STATUS
  const toggleStatus = async (identifier) => {

    try {

      await axiosInstance.post(

        `/${urlName}/toggle-status?identifier=${identifier}`,

        {}

      );

      fetchData();

    } catch (err) {

      console.error("Toggle Error:", err);

    }
  };

  return (

  <div className="w-full min-h-screen bg-white p-6 rounded-3xl">

    {/* HEADER */}
    <div className="mb-8 rounded-3xl border border-slate-200 bg-black p-8 shadow-lg">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-indigo-600 tracking-wide">
            {title}
          </h1>

          <p className="mt-2 text-slate-500 text-sm">
            Manage all {urlName} records
          </p>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-4">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-2xl border border-slate-300 bg-slate-100 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:bg-slate-200"
          >
            ← Back
          </button>

          {/* ADD BUTTON */}
          <button
            onClick={() =>
              navigate(`/dashboard/${urlName}/add`)
            }
            className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:bg-indigo-700 hover:scale-105"
          >
            + Add New
          </button>

        </div>

      </div>

    </div>

    {/* LOADING */}
    {error && (

      <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-bold text-rose-600">
        {error}
      </div>

    )}

    {/* LOADING */}
    {loading && (

      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-md">

        <p className="text-lg font-bold text-slate-600">
          Loading...
        </p>

      </div>

    )}

    {/* EMPTY */}
    {!loading && data.length === 0 && (

      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-md">

        <p className="text-lg font-bold text-slate-600">
          No Data Found
        </p>

      </div>

    )}

    {/* TABLE */}
    {!loading && data.length > 0 && (

      <>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

          <table className="min-w-full">

            {/* TABLE HEADER */}
            <thead className="bg-indigo-600">

              <tr>

                {columns.map((col, index) => (

                  <th
                    key={index}
                    className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest text-white"
                  >
                    {col.label}
                  </th>

                ))}

                <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-widest text-white">
                  Actions
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}
            <tbody>

              {data.map((item, rowIndex) => (

                <tr
                  key={getItemValue(item) || rowIndex}
                  className="border-b border-slate-100 transition duration-300 hover:bg-slate-50"
                >

                  {columns.map((col, i) => (

                    <td
                      key={i}
                      className="px-6 py-4 text-sm font-medium text-slate-700"
                    >

                      {/* STATUS */}
                      {col.field === "status" && showStatus ? (

                        <button
                          onClick={() =>
                            toggleStatus(item.identifier)
                          }
                          className={`rounded-full px-5 py-2 text-xs font-bold text-white shadow transition ${
                            item.status
                              ? "bg-emerald-500 hover:bg-emerald-600"
                              : "bg-rose-500 hover:bg-rose-600"
                          }`}
                        >

                          {item.status
                            ? "Active"
                            : "Inactive"}

                        </button>

                      ) : col.render ? (

                        col.render(item)

                      ) : (

                        item[col.field] || "-"

                      )}

                    </td>

                  ))}

                  {/* ACTIONS */}
                  <td className="px-6 py-4">

                    <div className="flex items-center justify-center gap-3">

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/${urlName}/edit/${encodeURIComponent(getItemValue(item))}`
                          )
                        }
            className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:bg-indigo-700 hover:scale-105"
                      >
                        Edit
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          deleteItem(getItemValue(item))
                        }
            className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:bg-indigo-700 hover:scale-105"
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
        <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:flex-row">

          {/* PAGE INFO */}
          <div className="text-sm font-semibold text-slate-700">

            Page{" "}
            <span className="rounded-lg bg-indigo-100 px-3 py-1 text-indigo-700">
              {currentPage + 1}
            </span>{" "}
            of{" "}
            <span className="rounded-lg bg-slate-100 px-3 py-1 text-slate-700">
              {totalPages}
            </span>

          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-4">

            {/* PREVIOUS */}
            <button
              disabled={currentPage === 0}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="rounded-2xl bg-slate-200 px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition duration-300 hover:bg-slate-300 disabled:opacity-40"
            >
              ← Previous
            </button>

            {/* PAGE NUMBER */}
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-bold text-white shadow-lg">
              {currentPage + 1}
            </div>

            {/* NEXT */}
            <button
              disabled={currentPage + 1 >= totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition duration-300 hover:bg-indigo-700 disabled:opacity-40"
            >
              Next →
            </button>

          </div>

        </div>
      </>

    )}

  </div>
);
};

export default CommonList;
