import { useState } from "react";
import "./CommonList.css";

const CommonList = ({
  title,
  data = [],
  columns = [],
  loading = false,
  error = "",
  page = 0,
  setPage,
  sizePerPage = 2,
  totalPages = 1,
  onAdd,
  addButtonText = "+ Add",
  actions = [],
  emptyMessage = "No data found",
}) => {
  const safeData = Array.isArray(data)
    ? data
    : [];

  const [openMenu, setOpenMenu] =
    useState(null);

  const toggleMenu = (id) => {
    setOpenMenu((prev) =>
      prev === id ? null : id
    );
  };

  if (loading)
    return <div>Loading...</div>;

  if (error) {
    return (
      <div style={{ color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div className="section">

      {/* HEADER */}
      <div className="tableHeader">
        <h2 className="sectionTitle">
          {title}
        </h2>

        {onAdd && (
          <button
            className="actionBtn"
            onClick={onAdd}
          >
            {addButtonText}
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="tableWrapper">
        <table className="productTable">

          <thead>
            <tr>
              {columns.map(
                (col, index) => (
                  <th key={index}>
                    {col.label}
                  </th>
                )
              )}

              {actions.length > 0 && (
                <th>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>

            {safeData.length > 0 ? (
              safeData.map(
                (row, rowIndex) => {
                  const rowId =
                    row.id ||
                    row._id ||
                    rowIndex;

                  return (
                    <tr key={rowId}>

                      {/* DATA COLUMNS */}
                      {columns.map(
                        (
                          col,
                          colIndex
                        ) => (
                          <td
                            key={colIndex}
                          >
                            {col.render
                              ? col.render(
                                  row,
                                  rowIndex
                                )
                              : row?.[
                                  col.key
                                ] ?? "-"}
                          </td>
                        )
                      )}

                      {/* ACTIONS */}
                      {actions.length >
                        0 && (
                        <td>
                          <div className="actionMenu">

                            {/* 3 DOT BUTTON */}
                            <button
                              className="menuBtn"
                              onClick={() =>
                                toggleMenu(
                                  rowId
                                )
                              }
                            >
                              ⋮
                            </button>

                            {/* DROPDOWN */}
                            {openMenu ===
                              rowId && (
                              <div className="dropdownMenu">

                                {actions.map(
                                  (
                                    action,
                                    actionIndex
                                  ) => (
                                    <button
                                      key={
                                        actionIndex
                                      }
                                      className={`dropdownItem ${
                                        action.type ===
                                        "delete"
                                          ? "delete"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        action.onClick(
                                          row
                                        );

                                        setOpenMenu(
                                          null
                                        );
                                      }}
                                    >
                                      {
                                        action.label
                                      }
                                    </button>
                                  )
                                )}

                              </div>
                            )}

                          </div>
                        </td>
                      )}

                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td
                  colSpan={
                    columns.length +
                    (actions.length >
                    0
                      ? 1
                      : 0)
                  }
                  className="emptyRow"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {setPage &&
        totalPages > 0 && (
          <div className="pagination">

            {/* PREVIOUS */}
            <button
              className="pageBtn"
              disabled={page === 0}
              onClick={() =>
                setPage(page - 1)
              }
            >
              Previous
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map(
              (_, index) => (
                <button
                  key={index}
                  className={`pageBtn ${
                    page === index
                      ? "activePage"
                      : ""
                  }`}
                  onClick={() =>
                    setPage(index)
                  }
                >
                  {index + 1}
                </button>
              )
            )}

            {/* NEXT */}
            <button
              className="pageBtn"
              disabled={
                page ===
                totalPages - 1
              }
              onClick={() =>
                setPage(page + 1)
              }
            >
              Next
            </button>

          </div>
        )}

    </div>
  );
};

export default CommonList;