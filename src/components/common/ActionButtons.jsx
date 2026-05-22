const ActionButtons = ({
  onEdit,
  onDelete,
  onToggle,
}) => {
  return (
    <div className="flex gap-2 justify-center">

      {onEdit && (
        <button
          onClick={onEdit}
          className="px-3 py-1 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Edit
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="px-3 py-1 text-xs rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ActionButtons;