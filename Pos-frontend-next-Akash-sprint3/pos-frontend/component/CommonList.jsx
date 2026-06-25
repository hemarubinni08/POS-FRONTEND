"use client";
import React, { useState, useEffect } from "react";
import { FiMoreVertical, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "@/component/Modal";

const CommonList = ({
  title,
  icon: TitleIcon,
  columns,
  data,
  loading,
  filterFunction,
  deleteApi,
  deleteIdentifierField,
  pagination,
  renderCustomCell,
  AddComponent,
  EditComponent,
  editPropName,
  enableStatusToggle = false,
  setData,
  toggleStatusApi,
  refreshData,
  hideAddButton = false,
  onSearchChange,
  searchTerm,
  setSearchTerm,
}) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  

  const [showAuditModal, setShowAuditModal] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddClick = () => {
    setSelectedItem(null);
    setIsEditMode(false);
    setOpenModal(true);
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditMode(true);
    setOpenModal(true);
  };

  const handleViewAudit = (item) => {
  setSelectedItem(item);
  setShowAuditModal(true);
};


  const handleDelete = async (item) => {
    if (!deleteApi) return;

    const confirmDelete = globalThis.confirm(`Delete this record?`);

    if (!confirmDelete) return;

    try {
      await deleteApi(item[deleteIdentifierField]);

      alert("Deleted successfully.");

      if (refreshData) {
        refreshData();
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
    setIsEditMode(false);

    if (refreshData) {
      refreshData();
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const getPageNumbers = () => {
    if (!pagination?.totalPage || pagination.totalPage <= 0) return [];

    const maxVisible = 5;

    let start = Math.max(0, pagination.page - Math.floor(maxVisible / 2));

    let end = Math.min(pagination.totalPage, start + maxVisible);

    if (end - start < maxVisible) {
      start = Math.max(0, end - maxVisible);
    }

    const pages = [];

    for (let i = start; i < end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const filteredData =
    searchTerm && filterFunction
      ? data.filter((item) => filterFunction(item, searchTerm))
      : data;

  const handleToggleStatus = async (item) => {
    if (!setData || !toggleStatusApi) return;
    const originalStatus = item.status;
    const newStatus = !originalStatus;
    setData((prev) =>
      prev.map((row) =>
        row.id === item.id ? { ...row, status: newStatus } : row,
      ),
    );
    try {
      console.log("Sending update:", {
        ...item,
        status: newStatus,
      });
      await toggleStatusApi({
        ...item,
        status: newStatus,
      });
    } catch (err) {
      console.error(err);
      setData((prev) =>
        prev.map((row) =>
          row.id === item.id
            ? {
                ...row,
                status: originalStatus,
              }
            : row,
        ),
      );
      alert("Status update failed.");
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            {TitleIcon && <TitleIcon className="text-blue-600" />} {title}
          </h2>
          <div className="relative flex-grow md:w-72">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder={`Search ${title}...`}
              value={searchTerm || ""}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);
                if (onSearchChange) {
                  onSearchChange(value);
                }
              }}
              className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-900"
            />

            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  if (onSearchChange) {
                    onSearchChange("");
                  }
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            )}
          </div>
          {AddComponent && !hideAddButton && (
            <button
              onClick={handleAddClick}
              className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded-md text-sm transition border border-blue-600 text-blue-600"
            >
              Add New
            </button>
          )}
          <Modal isOpen={openModal} onClose={handleCloseModal}>
            {isEditMode ? (
              <EditComponent
                {...{ [editPropName]: selectedItem }}
                onClose={handleCloseModal}
              />
            ) : (
              <AddComponent onClose={handleCloseModal} />
            )}
          </Modal>
          <Modal
            isOpen={showAuditModal}
            onClose={() => setShowAuditModal(false)}
          >
            <div className="p-4 min-w-[450px]">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Audit Information
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-600">Created By</p>
                  <p className="text-gray-600">
                    {selectedItem?.createdBy || "-"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">Created On</p>
                  <p className="text-gray-600">
                    {selectedItem?.createdOn
                      ? new Date(selectedItem.createdOn).toLocaleString()
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">Modified By</p>
                  <p className="text-gray-600">
                    {selectedItem?.modifiedBy || "-"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">Modified On</p>
                  <p className="text-gray-600">
                    {selectedItem?.modifiedOn
                      ? new Date(selectedItem.modifiedOn).toLocaleString()
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">Status</p>
                  <p className="text-gray-600">
                    {selectedItem?.status ? "Active" : "Inactive"}
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-gray-600">Identifier</p>
                  <p className="text-gray-600">{selectedItem?.identifier}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowAuditModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        </div>

        {/* Table Section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx} className="p-4 font-semibold text-gray-600">
                    {col.header}
                  </th>
                ))}
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="p-8 text-center text-gray-400"
                  >
                    Loading {title}...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
                  >
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className="p-4 text-gray-600">
                        {col.key === "status" &&
                        enableStatusToggle &&
                        toggleStatusApi ? (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              aria-label="Toggle status"
                              className="sr-only peer"
                              checked={item.status}
                              onChange={() => handleToggleStatus(item)}
                            />

                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                          </label>
                        ) : renderCustomCell ? (
                          renderCustomCell(col.key, item)
                        ) : (
                          item[col.key]
                        )}
                      </td>
                    ))}
                    <td className="p-4 relative">
                      <div
                        className="relative inline-block"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          onClick={() =>
                            setActiveMenu(activeMenu === rowIdx ? null : rowIdx)
                          }
                        >
                          <FiMoreVertical className="text-gray-500" />
                        </button>

                        {activeMenu === rowIdx && (
                          <div
                            className={`absolute right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 ${
                              rowIdx >= filteredData.length - 2
                                ? "bottom-full mb-1"
                                : "top-full mt-1"
                            }`}
                          >
                            {EditComponent && (
                              <button
                                onClick={() => {
                                  setActiveMenu(null);
                                  handleEditClick(item);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                              >
                                <FiEdit2 className="text-blue-600" />
                                Edit
                              </button>
                            )}

                            <button
                              onClick={() => {
                                setActiveMenu(null);
                                handleDelete(item);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <FiTrash2 />
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                setActiveMenu(null);
                                handleViewAudit(item);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2"
                            >
                              <FiEye className="text-indigo-600" />
                              View
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="p-8 text-center text-gray-400"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Pagination */}
      {pagination && (
        <div className="flex justify-center items-center mt-6 px-2 pb-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                pagination.setPage((prev) => Math.max(0, prev - 1))
              }
              disabled={pagination.page === 0 || loading}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                pagination.page === 0 || loading
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              Previous
            </button>

            <div className="flex gap-1">
              {getPageNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => pagination.setPage(num)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-bold border rounded-md transition-all ${
                    pagination.page === num
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm scale-110"
                      : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                pagination.setPage((prev) =>
                  Math.min(pagination.totalPage - 1, prev + 1),
                )
              }
              disabled={pagination.page >= pagination.totalPage - 1 || loading}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                pagination.page >= pagination.totalPage - 1 || loading
                  ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommonList;
