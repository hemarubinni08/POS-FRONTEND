import { useState, useEffect } from 'react';
import { FiLayers, FiSave, FiX} from 'react-icons/fi';
import api from '../api/axios';

const ProductEdit = ({ product, onClose }) => {
    const [formData, setFormData] = useState({
        identifier: '',
        category: '',
        warehouseName: '',
        supplierId: '',
        status: true
    });

    useEffect(() => {
        if(product)
        {
            setFormData(product);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post('/api/product/update', formData);
            if(response.data)
            {
                alert("Product Updated");
                onClose();
            }
        }
        catch(err)
        {
            console.error("Update failed:", err);
            alert("Error updating product.")
        }
    };

    return (
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-x1 font-bold flex items-center gap-2 text-gray-800'>
                    <FiLayers className='text-blue-600' /> Edit Product
                </h2>
            </div>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Identifier (Locked)</label>
                    <input type="text"
                    className='w-full p-2 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed'
                    value={formData.identifier}
                    disabled />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                    <input
                        type="text"
                        className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Warehouse Name</label>
                    <input type="text"
                        className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
                        value={formData.warehouseName} 
                        onChange={(e) => setFormData({ ...formData, warehouseName: e.target.value})}
                        required/>
                </div>
                
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier ID</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.supplierId}
                    onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                    required
                />
                </div>

                <button 
                    type="submit"
                    className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium'>
                        <FiSave /> Update Product
                    </button>
            </form>
        </div>
    );
};

export default ProductEdit;