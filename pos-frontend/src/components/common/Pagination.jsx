const Pagination = ({ page = 1, totalPages = 1, setPage }) => {
  const safeTotal = Math.max(totalPages || 1, 1);
  if (safeTotal <= 1) return null;

  return (
    <div className="flex justify-between items-center mt-4 text-sm text-gray-300">

      <div>
        Page <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{safeTotal}</span>
      </div>

      <div className="flex gap-2 flex-wrap">

        <button onClick={() => setPage(1)} disabled={page === 1}
          className="px-2 py-1 bg-gray-700 rounded disabled:opacity-40">⏮</button>

        <button onClick={() => setPage(page - 1)} disabled={page === 1}
          className="px-2 py-1 bg-gray-700 rounded disabled:opacity-40">◀</button>

        {[...Array(safeTotal)].map((_, i) => {
          const p = i + 1;
          return (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-2 py-1 rounded ${
                page === p
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {p}
            </button>
          );
        })}

        <button onClick={() => setPage(page + 1)} disabled={page === safeTotal}
          className="px-2 py-1 bg-gray-700 rounded disabled:opacity-40">▶</button>

        <button onClick={() => setPage(safeTotal)} disabled={page === safeTotal}
          className="px-2 py-1 bg-gray-700 rounded disabled:opacity-40">⏭</button>

      </div>
    </div>
  );
};

export default Pagination;
