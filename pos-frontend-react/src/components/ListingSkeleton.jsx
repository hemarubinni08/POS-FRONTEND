import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const C = {
  navy: "#363955", mid: "#54668E", light: "#879EC6",
  gray: "#E8E8E8", offWhite: "#F5F6E6", text: "#1e2235",
  muted: "#6b7280", white: "#ffffff",
};

const styles = {
  page: {
    position: "fixed", top: "60px", left: "220px", right: 0, bottom: 0,
    backgroundColor: "#F0F1F5", fontFamily: "'Segoe UI', sans-serif",
    display: "flex", flexDirection: "column", overflow: "hidden",
  },
  inner: {
    flex: 1, padding: "20px 24px",
    display: "flex", flexDirection: "column", overflow: "hidden",
  },
  topRow: {
    display: "flex", alignItems: "center",
    marginBottom: "16px", flexShrink: 0, position: "relative",
  },
  backBtn: {
    padding: "7px 16px", backgroundColor: "transparent",
    color: C.mid, border: `1.5px solid ${C.mid}`,
    borderRadius: "7px", fontSize: "12px",
    fontWeight: "600", cursor: "pointer", flexShrink: 0,
  },
  title: {
    position: "absolute", left: "50%", transform: "translateX(-50%)",
    margin: 0, fontSize: "19px", fontWeight: "700",
    color: C.navy, whiteSpace: "nowrap",
  },
  addBtn: {
    marginLeft: "auto",
    padding: "8px 18px",
    background: `linear-gradient(135deg, ${C.navy}, ${C.mid})`,
    color: "#fff", border: "none",
    borderRadius: "7px", cursor: "pointer",
    fontSize: "13px", fontWeight: "600", flexShrink: 0,
    letterSpacing: "0.2px",
    boxShadow: `0 3px 10px rgba(54,57,85,0.25)`,
  },
  card: {
    background: C.white, borderRadius: "10px",
    boxShadow: "0 2px 12px rgba(54,57,85,0.08)",
    border: `1px solid ${C.gray}`,
    flex: 1, overflow: "hidden", display: "flex", flexDirection: "column",
  },
  tableWrap: { overflowY: "auto", flex: 1 },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left", padding: "11px 14px",
    borderBottom: `2px solid ${C.gray}`,
    fontSize: "11px", color: C.mid,
    fontWeight: "700", textTransform: "uppercase",
    letterSpacing: "0.6px",
    backgroundColor: C.offWhite,
    position: "sticky", top: 0,
  },
  tr: { borderBottom: `1px solid #f3f4f6`, transition: "background 0.1s" },
  td: { padding: "11px 14px", fontSize: "13px", color: C.text },
  toggle: {
    width: "46px", padding: "4px 0",
    textAlign: "center", color: "#fff",
    borderRadius: "20px", cursor: "pointer",
    fontSize: "11px", fontWeight: "600",
    userSelect: "none", border: "none",
  },
  actionEdit: {
    marginRight: "6px", padding: "4px 12px",
    borderRadius: "6px", backgroundColor: C.mid,
    color: "white", border: "none",
    cursor: "pointer", fontSize: "12px", fontWeight: "600",
  },
  actionDelete: {
    padding: "4px 12px", borderRadius: "6px",
    backgroundColor: "#dc2626",
    color: "white", border: "none",
    cursor: "pointer", fontSize: "12px", fontWeight: "600",
  },
  emptyRow: {
    textAlign: "center", padding: "48px",
    color: C.light, fontSize: "13px",
  },
  paginationBar: {
    display: "flex", alignItems: "center",
    justifyContent: "center", gap: "5px",
    padding: "10px 16px",
    borderTop: `1px solid ${C.gray}`,
    backgroundColor: C.offWhite,
    flexShrink: 0,
  },
  pageBtn: {
    minWidth: "34px", height: "34px", padding: "0 9px",
    borderRadius: "7px", border: `1.5px solid ${C.gray}`,
    backgroundColor: C.white, color: "#374151",
    fontSize: "12px", fontWeight: "600", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  pageBtnActive: {
    background: `linear-gradient(135deg, ${C.navy}, ${C.mid})`,
    borderColor: C.mid, color: "#fff",
  },
  pageArrow: {
    minWidth: "34px", height: "34px", padding: "0 10px",
    borderRadius: "7px", border: `1.5px solid ${C.gray}`,
    backgroundColor: C.white, color: C.mid,
    fontSize: "15px", fontWeight: "700", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  pageArrowDisabled: { color: "#d1d5db", borderColor: C.gray, cursor: "not-allowed" },
  pageInfo: { fontSize: "12px", color: C.muted, padding: "0 8px", whiteSpace: "nowrap" },
};

export default function ListingSkeleton({
  title, fields, apis, addPath, editPathBase,
  paramKey = "identifier", identifierLabel = "Identifier",
}) {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    page: 0, sizePerPage: 5, sortDirection: "ASC", sortField: "id",
  });

  async function loadList() {
    const res = await api.post(apis.list, pagination);
    if (Array.isArray(res.data)) {
        setData(res.data);
        setTotalPages(1);
    } else {
        setData(res.data.dtoList ?? []);
        setTotalPages(res.data.totalPages ?? 1);
    }
}

  useEffect(() => { loadList(); }, [pagination]);

  async function handleDelete(row) {
    const value = row[paramKey];
    if (!window.confirm(`Delete "${value}"? This cannot be undone.`)) return;
    await api.get(`${apis.delete}?${paramKey}=${value}`);
    loadList();
  }

  async function handleToggle(row) {
    await api.post(`${apis.toggleStatus}?${paramKey}=${row[paramKey]}`);
    loadList();
  }

  function goToPage(pageIndex) {
    setPagination(prev => ({ ...prev, page: pageIndex }));
  }

  const currentPage = pagination.page;

  function getVisiblePages() {
    let start = currentPage - 1;
    if (start < 0) start = 0;
    if (start + 3 > totalPages) start = totalPages - 3;
    if (start < 0) start = 0;
    return Array.from({ length: Math.min(3, totalPages) }, (_, i) => start + i);
  }

  return (
    <div style={styles.page}>
      <div style={styles.inner}>
        <div style={styles.topRow}>
          <button style={styles.backBtn} onClick={() => navigate("/home")}>← Home</button>
          <h2 style={styles.title}>{title}</h2>
          <button style={styles.addBtn} onClick={() => navigate(addPath)}>
            + Add {title}
          </button>
        </div>

        <div style={styles.card}>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>{identifierLabel}</th>
                  {fields.map(f => (
                    <th key={f} style={styles.th}>{f.charAt(0).toUpperCase() + f.slice(1)}</th>
                  ))}
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={fields.length + 3} style={styles.emptyRow}>
                      No records found.
                    </td>
                  </tr>
                ) : (
                  data.map(row => (
                    <tr key={row[paramKey]} style={styles.tr}>
                      <td style={styles.td}>{row[paramKey]}</td>
                      {fields.map(f => (
                        <td style={styles.td} key={f}>
                          {Array.isArray(row[f]) ? row[f].join(", ") : row[f]}
                        </td>
                      ))}
                      <td style={styles.td}>
                        <button
                          style={{
                            ...styles.toggle,
                            background: row.status
                              ? `linear-gradient(135deg, ${C.navy}, ${C.mid})`
                              : "#d1d5db",
                          }}
                          onClick={() => handleToggle(row)}
                        >
                          {row.status ? "ON" : "OFF"}
                        </button>
                      </td>
                      <td style={styles.td}>
                        <button style={styles.actionEdit}
                          onClick={() => navigate(editPathBase + row[paramKey])}>
                          Edit
                        </button>
                        <button style={styles.actionDelete}
                          onClick={() => handleDelete(row)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div style={styles.paginationBar}>
              <button
                style={{ ...styles.pageArrow, ...(currentPage === 0 ? styles.pageArrowDisabled : {}) }}
                onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>
                ‹
              </button>
              {getVisiblePages().map(pageIndex => (
                <button key={pageIndex}
                  style={{ ...styles.pageBtn, ...(currentPage === pageIndex ? styles.pageBtnActive : {}) }}
                  onClick={() => goToPage(pageIndex)}>
                  {pageIndex + 1}
                </button>
              ))}
              <button
                style={{ ...styles.pageArrow, ...(currentPage === totalPages - 1 ? styles.pageArrowDisabled : {}) }}
                onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
                ›
              </button>
              <span style={styles.pageInfo}>Page {currentPage + 1} of {totalPages}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}