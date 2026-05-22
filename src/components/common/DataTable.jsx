import ActionButtons from "./ActionButtons";

const DataTable = ({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onToggle,
  loading = false
}) => {

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading data...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow">

      <table className="w-full text-sm">

        <thead className="bg-gray-900 text-white">
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left px-4 py-3 capitalize">
                {col}
              </th>
            ))}
            <th className="text-center px-4 py-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>

          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-10 text-gray-500"
              >
                No data found
              </td>
            </tr>
          ) : (

            data.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >

                {columns.map((col) => (
                  <td key={col} className="px-4 py-3">
                    {String(item?.[col] ?? "-")}
                  </td>
                ))}

                <td className="px-4 py-3">
                  <ActionButtons
                    onEdit={() => onEdit?.(item)}
                    onDelete={() => onDelete?.(item.identifier)}
                    onToggle={() => onToggle?.(item.identifier)}
                  />
                </td>

              </tr>
            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default DataTable;