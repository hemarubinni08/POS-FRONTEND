import { useState } from "react";
import "./List.css";

const CommonList = ({
  title,
  data = [],
  columns = [],
  loading = false,
  error = "",
  page = 0,
  setPage,
  sizePerPage = 5,
  totalPages = 0,

  // ADD
  onAdd,
  addButtonText = "+ Add",
  addFields = [],
  newItem = {},
  setNewItem,
  handleAdd,

  // EDIT
  editItem,
  setEditItem,
  handleUpdate,
  editFields = [],

  // ACTIONS
  actions = [],

  emptyMessage = "No data found",
}) => {
  const safeData = Array.isArray(data) ? data : [];

  const [openMenu, setOpenMenu] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="section">

      {/* HEADER */}
      <div className="tableHeader">
        <h2 className="sectionTitle">{title}</h2>

        {onAdd && (
          <button
            className="actionBtn"
            onClick={() => {
              setShowAddModal(true);
              onAdd();
            }}
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
              {columns.map((col, i) => (
                <th key={i}>{col.label}</th>
              ))}
              {actions.length > 0 && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {safeData.length > 0 ? (
              safeData.map((row, rowIndex) => {
                const rowId = row.id || row._id || rowIndex;

                return (
                  <tr key={rowId}>
                    {columns.map((col, i) => (
                      <td key={i}>
                        {col.render
                          ? col.render(row)
                          : row?.[col.key] ?? "-"}
                      </td>
                    ))}

                    {actions.length > 0 && (
                      <td>
                        <div className="actionMenu">
                          <button
                            className="menuBtn"
                            onClick={() => toggleMenu(rowId)}
                          >
                            ⋮
                          </button>

                          {openMenu === rowId && (
                            <div className="dropdownMenu">
                              {actions.map((action, i) => (
                                <button
                                  key={i}
                                  className="dropdownItem"
                                  onClick={() => {
                                    action.onClick(row);
                                    setOpenMenu(null);
                                  }}
                                >
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions.length ? 1 : 0)}
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
      {setPage && totalPages > 0 && (
        <div className="pagination">

          <button
            className="pageBtn"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`pageBtn ${page === i ? "activePage" : ""}`}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="pageBtn"
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>

        </div>
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="modalOverlay">
          <div className="modal">

            <h2>Add {title}</h2>

            {addFields.map((field, index) => (
              <div key={index}>

                {field.type === "select" ? (
                  <select
                    value={newItem[field.name] || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        [field.name]: e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select {field.label}
                    </option>

                    {field.options?.map((opt, i) => (
                      <option
                        key={i}
                        value={opt.value}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    placeholder={field.label}
                    value={newItem[field.name] || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        [field.name]: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            ))}

            <div className="modalActions">
              <button
                onClick={async () => {
                  await handleAdd();
                  setShowAddModal(false);
                }}
              >
                Add
              </button>

              <button onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <div className="modalOverlay">
          <div className="modal">

            <h2>Edit {title}</h2>

            {editFields.map((field, index) => (
              <div key={index}>

                {field.type === "select" ? (
                  <select
                    value={editItem[field.name] || ""}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        [field.name]: e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select {field.label}
                    </option>

                    {field.options?.map((opt, i) => (
                      <option
                        key={i}
                        value={opt.value}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    disabled={field.disabled}
                    value={editItem[field.name] || ""}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        [field.name]: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            ))}

            <div className="modalActions">

              <button onClick={handleUpdate}>
                Update
              </button>

              <button onClick={() => setEditItem(null)}>
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CommonList;