import React from 'react';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';

const CommonList = ({ 
    title, 
    icon: TitleIcon, 
    headerExtras,
    columns, 
    data, 
    loading, 
    onAdd, 
    onEdit, 
    onDelete, 
    pagination, 
    renderCustomCell 
}) => {
    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
                        {TitleIcon && <TitleIcon className="text-blue-600" />} {title}
                    </h2>
                    {headerExtras && (
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {headerExtras}
                        </div>
                    )}
                    <button 
                        onClick={onAdd} 
                        className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded-md text-sm transition border border-blue-600 text-blue-600"
                    >
                        Add New
                    </button>
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
                                <th className='p-4 font-semibold text-gray-600'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length + 1} className="p-8 text-center text-gray-400">
                                        Loading {title}...
                                    </td>
                                </tr>
                            ) : data.length > 0 ? (
                                data.map((item, rowIdx) => (
                                    <tr key={rowIdx} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                                        {columns.map((col, colIdx) => (
                                            <td key={colIdx} className="p-4 text-gray-600">
                                                {/* Use custom cell renderer if provided, otherwise fallback to raw key */}
                                                {renderCustomCell ? renderCustomCell(col.key, item) : item[col.key]}
                                            </td>
                                        ))}
                                        <td className='p-4 relative'>
                                            <div className='group relative inline-block'>
                                                <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                                                    <FiMoreVertical className="text-gray-500"/>
                                                </button>
                                                <div className='hidden group-hover:block absolute right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2'>
                                                    <button 
                                                        onClick={() => onEdit(item)} 
                                                        className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2'
                                                    >
                                                        <FiEdit2 className='text-blue-600' /> Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => onDelete(item)} 
                                                        className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2'
                                                    >
                                                        <FiTrash2 /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + 1} className="p-8 text-center text-gray-400">
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
                            onClick={() => pagination.setPage(prev => Math.max(0, prev - 1))}
                            disabled={pagination.page === 0 || loading}
                            className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                                pagination.page === 0 || loading ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-50'
                            }`}
                        >
                            Previous
                        </button>
                        
                        <div className='flex gap-1'>
                            {pagination.getPageNumbers().map((num) => (
                                <button
                                    key={num}
                                    onClick={() => pagination.setPage(num)}
                                    className={`w-10 h-10 flex items-center justify-center text-sm font-bold border rounded-md transition-all ${
                                        pagination.page === num ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-110' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                                    }`}
                                >
                                    {num + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => pagination.setPage(prev => Math.min(pagination.totalPage - 1, prev + 1))}
                            disabled={pagination.page >= pagination.totalPage - 1 || loading}
                            className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                                pagination.page >= pagination.totalPage - 1 || loading ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-blue-50'
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
