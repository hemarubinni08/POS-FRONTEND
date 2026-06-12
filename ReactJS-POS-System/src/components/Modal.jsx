import { FiX } from 'react-icons/fi';
const Modal = ({ isOpen, onClose, children}) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-x1 shadow-2x1 p-6 w-full max-w-lg z-10 border border-gray-200 p-6">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black"><FiX></FiX></button>
                {children}
            </div>
        </div>
    );
};

export default Modal;