import React from "react";

const TableToolbar = ({
  title,
  search,
  setSearch,
  onAdd,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-3">

      {/* ✅ TITLE */}
      <h3 className="text-lg font-semibold text-gray-800">
        {title}
      </h3>

      {/* ✅ ACTIONS */}
      <div className="flex gap-2 items-center">

        {/* ✅ SEARCH INPUT */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-gray-700 text-white px-3 py-2 rounded 
          border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* ✅ ADD BUTTON */}
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-4 py-2 text-sm rounded-lg text-white 
            bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900
            hover:from-blue-900 hover:to-indigo-800 transition-all duration-300"
          >
            + Add
          </button>
        )}

      </div>
    </div>
  );
};

export default TableToolbar;