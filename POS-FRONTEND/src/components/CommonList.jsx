import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {listItems, toggleItem, deleteItem} from "../services/api";

function CommonList({

  title,
  subtitle,
  entity,
  addPath,
  editPath,
  columns,
  showToggle = true

}) {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [toast, setToast] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  const [totalRecords, setTotalRecords] = useState(0);

  const [pageSize] = useState(2);

  const startRecord =
    totalRecords === 0
      ? 0
      : currentPage * pageSize + 1;

  const endRecord =
    Math.min(
      (currentPage + 1) * pageSize,
      totalRecords
    );

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState(null);

  const loadItems = async () => {

    try {

      setLoading(true);

      const data = await listItems(entity, {
        page: currentPage,
        sizePerPage: pageSize,
      });

      setItems(data.items || []);
      setTotalPages(data.totalPages || 0);
      setTotalRecords(data.totalRecords || 0);

    } catch (error) {

      console.error(error);

      setError(`Failed to load ${title}`);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadItems();

  }, [currentPage]);

  const handleToggleStatus = async (
    identifier,
    currentStatus
  ) => {

    try {

      const updatedStatus = !currentStatus;

      await toggleItem(
        entity,
        identifier,
        updatedStatus
      );

      setItems((prevItems) =>

        prevItems.map((item) =>

          item.identifier === identifier

            ? {
                ...item,
                status: updatedStatus
              }

            : item

        )

      );

      setToast("Status Updated Successfully");

      setTimeout(() => {

        setToast("");

      }, 800);

    } catch (error) {

      console.error(error);

      setToast("Failed To Update Status");

      setTimeout(() => {

        setToast("");

      }, 2500);

    }

  };

  const handleDeleteItem = async () => {

    try {

      await deleteItem(
        entity,
        selectedItem.identifier
      );

      setItems((prevItems) =>

        prevItems.filter(

          (item) =>

            item.identifier !==
            selectedItem.identifier

        )

      );

      setToast("Deleted Successfully");

      setShowDeleteModal(false);

      setSelectedItem(null);

      setTimeout(() => {

        setToast("");

      }, 1500);

    } catch (error) {

      console.error(error);

      setToast("Failed To Delete");

      setTimeout(() => {

        setToast("");

      }, 2500);

    }

  };

  const handleNextPage = () => {

    if (currentPage < totalPages - 1) {

      setCurrentPage(prev => prev + 1);

    }

  };

  const handlePreviousPage = () => {

    if (currentPage > 0) {

      setCurrentPage(prev => prev - 1);

    }

  };

  const handlePageClick = (pageNumber) => {

    setCurrentPage(pageNumber);

};

const pageNumbers = [];

  for (
    let i = 0;
    i < totalPages;
    i++
  ) {

    pageNumbers.push(i);

  }

  if (loading) {

    return (

      <div className="flex items-center justify-center h-125">

        <div className="text-gray-500 text-lg font-medium">

          Loading...

        </div>

      </div>

    );

  }

  if (error) {

    return (

      <div className="flex items-center justify-center h-125">

        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl">

          {error}

        </div>

      </div>

    );

  }

  return (

    <div className="max-w-7xl mx-auto">

      {/* TOAST */}

      {

        toast && (

          <div className="fixed top-6 right-6 z-50 bg-[#111827] text-white px-6 py-4 rounded-2xl shadow-2xl">

            {toast}

          </div>

        )

      }

      {/* DELETE MODAL */}

      {

        showDeleteModal && (

          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white w-107.5 rounded-[30px] p-8 shadow-2xl">

              <h2 className="text-2xl font-bold text-gray-900">

                Delete {title}

              </h2>

              <p className="text-gray-500 mt-4 leading-relaxed">

                Are you sure you want to delete

                <span className="font-semibold text-gray-900">

                  {" "}
                  {selectedItem?.identifier}

                </span>

                ?

              </p>

              <div className="flex justify-end gap-4 mt-8">

                <button
                  onClick={() => {

                    setShowDeleteModal(false);

                    setSelectedItem(null);

                  }}
                  className="h-12 px-6 rounded-2xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >

                  Cancel

                </button>

                <button
                  onClick={handleDeleteItem}
                  className="h-12 px-6 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-medium transition-all"
                >

                  Delete

                </button>

              </div>

            </div>

          </div>

        )

      }

      {/* HEADER */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-gray-900">

            {title}

          </h1>

          <p className="text-gray-500 mt-2 text-lg">

            {subtitle}

          </p>

        </div>

        <button
          onClick={() => navigate(addPath)}
          className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-lg shadow-blue-500/20"
        >

          + Add

        </button>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-[30px] border border-gray-200 overflow-hidden shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#f8fafc] border-b border-gray-200">

              <tr>

                {

                  columns.map((column, index) => (

                    <th
                      key={index}
                      className="text-left px-6 py-5 text-sm font-semibold text-gray-500"
                    >

                      {column.header}

                    </th>

                  ))

                }

                {
                    showToggle && (

                        <th className="text-left px-6 py-5 text-sm font-semibold text-gray-500">

                            Status

                        </th>
                    )
                }

                <th className="text-center px-6 py-5 text-sm font-semibold text-gray-500">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {

                items.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-[#fafcff] transition-all"
                  >

                    {

                      columns.map((column, i) => (

                        <td
                          key={i}
                          className="px-6 py-5 text-gray-700"
                        >

                          {

                            Array.isArray(item[column.field])

                              ? (

                                  <div className="flex flex-wrap gap-2">

                                    {

                                      item[column.field].map(
                                        (value, index) => (

                                          <span
                                            key={index}
                                            className="px-3 py-1 rounded-xl bg-blue-100 text-blue-700 text-sm font-medium"
                                          >

                                            {value}

                                          </span>

                                        )
                                      )

                                    }

                                  </div>

                                )

                              : item[column.field]

                          }

                        </td>

                      ))

                    }

                    {/* STATUS */}

                    {
                        showToggle && (

                            <td className="px-6 py-5">

                            <button
                                onClick={() =>
                                handleToggleStatus(
                                    item.identifier,
                                    item.status
                                )
                                }
                                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all ${
                                item.status
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                                }`}
                            >

                                <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-all ${
                                    item.status
                                    ? "translate-x-8"
                                    : "translate-x-1"
                                }`}
                                />

                            </button>

                            </td>

                        )
                    }

                    {/* ACTIONS */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-3">

                        <button
                          onClick={() =>
                            navigate(
                              `${editPath}/${item.identifier}`
                            )
                          }
                          className="h-10 w-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all"
                        >

                          ✎

                        </button>

                        <button
                          onClick={() => {

                            setSelectedItem(item);

                            setShowDeleteModal(true);

                          }}
                          className="h-10 w-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
                        >

                          🗑

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}

        <div className="flex items-center justify-between px-6 py-5 border-t border-gray-200 bg-white">

          {/* RECORD INFO */}

          <div className="text-sm text-gray-500 font-medium">

            Showing

            <span className="text-gray-900 font-semibold mx-1">

              {startRecord}

            </span>

            -

            <span className="text-gray-900 font-semibold mx-1">

              {endRecord}

            </span>

            of

            <span className="text-gray-900 font-semibold mx-1">

              {totalRecords}

            </span>

            records

          </div>

          {/* BUTTONS */}

          <div className="flex items-center gap-2">

            {/* PREVIOUS */}

            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className={`h-10 px-4 rounded-xl border text-sm font-medium transition-all

              ${currentPage === 0

                ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"

                : "border-gray-300 text-gray-700 hover:bg-gray-50"

              }`}
            >

              Previous

            </button>

            {/* PAGE BUTTONS */}

            {

              pageNumbers.map((page) => (

                <button
                  key={page}
                  onClick={() =>
                    handlePageClick(page)
                  }
                  className={`h-10 w-10 rounded-xl text-sm font-semibold transition-all

                  ${currentPage === page

                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"

                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"

                  }`}
                >

                  {page + 1}

                </button>

              ))

            }

            {/* NEXT */}

            <button
              onClick={handleNextPage}
              disabled={
                currentPage === totalPages - 1
              }
              className={`h-10 px-4 rounded-xl border text-sm font-medium transition-all

              ${currentPage === totalPages - 1

                ? "border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50"

                : "border-gray-300 text-gray-700 hover:bg-gray-50"

              }`}
            >

              Next

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CommonList;