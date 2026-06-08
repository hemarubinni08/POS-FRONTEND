// "use client";
// import { useState, useEffect } from 'react';
// import { FiLayers, FiSave} from 'react-icons/fi';
// import api from '../api/axios';

// const ProductEdit = ({ product, onClose }) => {
//     const [formData, setFormData] = useState({
//         identifier: '',
//         category: '',
//         warehouseName: '',
//         supplierId: '',
//         status: true
//     });

//     useEffect(() => {
//         if(product)
//         {
//             setFormData(product);
//         }
//     }, [product]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try{
//             const response = await api.post('/api/product/update', formData);
//             if(response.data)
//             {
//                 alert("Product Updated");
//                 onClose();
//             }
//         }
//         catch(err)
//         {
//             console.error("Update failed:", err);
//             alert("Error updating product.")
//         }
//     };

//     const [categories, setCategories] = useState([]);
//     const [showDropDown, setShowDropDown] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [isSearching, setIsSearching] = useState(false);

//     const [warehouses, setWarehouses] = useState([]);
//     const [showWarehouseDropDown, setShowWarehouseDropDown] = useState(false);
//     const [warehouseSearchTerm, setWarehouseSearchTerm] = useState('');
//     const [isSearchingWarehouse, setIsSearchingWarehouse] = useState(false);

//     const searchWarehouses = async (term) => {
//     setIsSearchingWarehouse(true);

//     try {
//         const response = await api.post('/api/warehouse/list', {
//             page: 0,
//             sizePerPage: 10,
//             sortField: 'identifier',
//             filter: term
//         });

//         setWarehouses(response.data.dtoList || []);
//     }
//     catch (err) {
//         console.error("Warehouse search failed", err);
//     }
//     finally {
//         setIsSearchingWarehouse(false);
//     }
//     };

//     const searchCategories = async (term) => {
//     setIsSearching(true);

//     try {
//         const response = await api.post('/api/category/list', {
//             page: 0,
//             sizePerPage: 10,
//             sortField: 'identifier',
//             filter: term
//         });

//         setCategories(response.data.dtoList || []);
//     }
//     catch (err) {
//         console.error("Category search failed", err);
//     }
//     finally {
//         setIsSearching(false);
//     }
//     };

//     useEffect(() => {
//     const timer = setTimeout(() => {
//         if (warehouseSearchTerm) {
//             searchWarehouses(warehouseSearchTerm);
//         } else {
//             setWarehouses([]);
//         }
//     }, 300);

//     return () => clearTimeout(timer);
// }, [warehouseSearchTerm]);

// useEffect(() => {
//     const timer = setTimeout(() => {
//         if (searchTerm) {
//             searchCategories(searchTerm);
//         } else {
//             setCategories([]);
//         }
//     }, 300);

//     return () => clearTimeout(timer);
// }, [searchTerm]);

// useEffect(() => {
//     const closeMenus = () => {
//         setShowDropDown(false);
//         setShowWarehouseDropDown(false);
//     };

//     window.addEventListener('click', closeMenus);

//     return () =>
//         window.removeEventListener('click', closeMenus);
// }, []);

//     return (
//         <div className='bg-white rounded-xl shadow-xl p-6 w-full max-w-lg text-gray-800'>
//             <div className='bg-white rounded-xl w-full max-w-lg'>
//                 <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
//                     <FiLayers className='text-blue-600' /> Edit Product
//                 </h2>
//             </div>
//             <form onSubmit={handleSubmit} className='space-y-4'>
//                 <div>
//                     <label className='block text-sm font-medium text-gray-700 mb-1'>Identifier (Locked)</label>
//                     <input type="text"
//                     className='w-full p-2 border border-gray-200 rounded-md bg-gray-50 cursor-not-allowed'
//                     value={formData.identifier}
//                     disabled />
//                 </div>

//                 <div
//     className='relative'
//     onClick={(e) => e.stopPropagation()}
// >
//     <label className='block text-sm font-medium text-gray-700 mb-1'>
//         Category
//     </label>

//     <input
//         type="text"
//         className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
//         value={formData.category}
//         onFocus={() => setShowDropDown(true)}
//         onChange={(e) => {
//             const val = e.target.value;
//             setFormData({ ...formData, category: val });
//             setSearchTerm(val);
//         }}
//         required
//     />

//     {showDropDown && (categories.length > 0 || isSearching) && (
//         <ul className='absolute left-0 right-0 z-[100] w-full bg-white border border-gray-300 rounded-md mt-1 shadow-xl max-h-60 overflow-auto'>
//             {isSearching ? (
//                 <li className='p-3 text-sm text-gray-500'>
//                     Searching...
//                 </li>
//             ) : (
//                 categories.map((cat, idx) => (
//                     <li
//                         key={cat.id || idx}
//                         className='p-3 text-sm hover:bg-blue-600 hover:text-white cursor-pointer'
//                         onClick={() => {
//                             setFormData({
//                                 ...formData,
//                                 category: cat.identifier
//                             });

//                             setShowDropDown(false);
//                             setCategories([]);
//                         }}
//                     >
//                         {cat.identifier}
//                     </li>
//                 ))
//             )}
//         </ul>
//     )}
// </div>

//                 <div className='relative'
//                     onClick={(e) => e.stopPropagation()}>
//                     <label className='block text-sm font-medium text-gray-700 mb-1'>Warehouse Name</label>
//                     <input
//                     type="text"
//                     className='w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none'
//                     value={formData.warehouseName}
//                     onFocus={() => setShowWarehouseDropDown(true)}
//                     onChange={(e) => {
//                         const val = e.target.value;

//                         setFormData({
//                             ...formData,
//                             warehouseName: val
//                         });

//                         setWarehouseSearchTerm(val);
//                     }}
//                     required
//                     />
//                         {showWarehouseDropDown && (warehouses.length > 0 || isSearchingWarehouse) && (
//                             <ul className='absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg max-h-60 overflow-auto'>
//                                 {isSearchingWarehouse ? (
//                                     <li className='p-2 text-sm text-gray-400'>Searching...</li>
//                                 ) : (
//                                     warehouses.map((wh, idx) => (
//                                         <li
//                                             key={wh.id || idx}
//                                             className='p-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer border-b border-gray-100 last:border-none'
//                                             onClick={() => 
//                                                 {setFormData({ ...formData, warehouseName: wh.identifier });
//                                                 setShowWarehouseDropDown(false);
//                                                 setWarehouses([]);
//                                                 setWarehouseSearchTerm('');
//                                             }}
//                                         >
//                                             {wh.identifier}
//                                         </li>
//                                     ))
//                                 )}
//                             </ul>
//                         )}
//                 </div>
                
//                 <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Supplier ID</label>
//                 <input
//                     type="text"
//                     className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//                     value={formData.supplierId}
//                     onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
//                     required
//                 />
//                 </div>

//                 <button 
//                     type="submit"
//                     className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium'>
//                         <FiSave /> Update Product
//                     </button>
//             </form>
//         </div>
//     );
// };

// export default ProductEdit;
"use client";

import { useState, useEffect } from "react";
import { FiLayers } from "react-icons/fi";
import api from "../api/axios";
import CommonEdit from "@/component/CommonEdit";
const ProductEdit = ({ product, onClose }) => {

    const [formData, setFormData] = useState({
        identifier: "",
        category: "",
        warehouseName: "",
        supplierId: "",
        status: true
    });

    useEffect(() => {
        if (product) {
            setFormData(product);
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/api/product/update",
                formData
            );

            if (response.data) {
                alert("Product Updated Successfully");
                onClose();
            }
        } catch (err) {
            console.error("Update failed:", err);
            alert("Error updating product");
        }
    };

    const productFields = [
        {
            key: "identifier",
            label: "Identifier",
            type: "text",
            disabled: true
        },
        {
            key: "category",
            label: "Category",
            type: "search",
            api: "/api/category/list"
        },
        {
            key: "warehouseName",
            label: "Warehouse Name",
            type: "search",
            api: "/api/warehouse/list"
        },
        {
            key: "supplierId",
            label: "Supplier ID",
            type: "number"
        }
    ];

    return (
        <CommonEdit
            title="Edit Product"
            icon={FiLayers}
            formData={formData}
            setFormData={setFormData}
            fields={productFields}
            onSubmit={handleSubmit}
            submitLabel="Update Product"
        />
    );
};

export default ProductEdit;