const Modal = ({ open, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">

      <div className="bg-white w-full max-w-md rounded-xl p-3 shadow-lg max-h-[80vh] overflow-y-auto">
        {children}
      </div>

    </div>
  );
};

export default Modal;