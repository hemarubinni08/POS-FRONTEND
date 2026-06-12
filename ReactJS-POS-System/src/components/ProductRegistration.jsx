import { useState, useEffect } from 'react';
import { FiPackage, FiSave } from 'react-icons/fi';
import api from '../api/axios';

const ProductRegistration = ({ onSuccess, onClose }) => {
  const [productData, setProductData] = useState({
    identifier: '',
    supplierId: '',
    warehouseName: '',
    category: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Category Search State
  const [categories, setCategories] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  //Warehouse Search State
  const [warehouses, setWarehouses] = useState([]);
  const [showWarehouseDropDown, setShowWarehouseDropDown] = useState(false);
  const [warehouseSearchTerm, setWarehouseSearchTerm] = useState('');
  const [isSearchingWarehouse, setIsSearchingWarehouse] = useState(false);
  
  //Search logic for Warehouse
  const searchWarehouses = async (term) => {
    setIsSearchingWarehouse(true);
    try {
      const response = await api.post('/api/warehouse/list', {
        page: 0,
        sizePerPage: 10,
        sortField: 'identifier',
        filter: term
      });
      setWarehouses(response.data.dtoList || []);
    }
    catch (err)
    {
      console.error("Warehouse search failed", err);
    }
    finally
    {
      setIsSearchingWarehouse(false);
    }
  };

  //Search Logic for Category
  const searchCategories = async (term) => {
    setIsSearching(true);
    try{
      const response = await api.post('/api/category/list', {
        page: 0,
        sizePerPage: 10,
        sortField: 'identifier',
        filter:term
      });
      setCategories(response.data.dtoList || []);
      console.log(response.data);
    }
    catch(err)
    {
      console.error("Search Failed", err);
    }
    finally
    {
      setIsSearching(false);
    }
  };

  //Debounce Warehouse
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(warehouseSearchTerm)
      {
        searchWarehouses(warehouseSearchTerm);
      }
      else
      {
        setWarehouses([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [warehouseSearchTerm]);

  //Debounce Category
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(searchTerm)
      {
        searchCategories(searchTerm);
      }
      else
      {
        setCategories([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  
  const validate = () => {
    if (!productData.identifier.trim()) return "Product name is required.";
    if (!productData.supplierId || isNaN(productData.supplierId)) return "Valid supplier ID is required.";
    if (!productData.warehouseName.trim()) return "Warehouse name is required.";
    if (!productData.category.trim()) return "Category is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validate();
    if (errorMsg) {
      setMessage({ text: errorMsg, type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/api/product/add', {
        ...productData,
        supplierId: parseInt(productData.supplierId)
      });

      setMessage({ text: 'Product registered successfully!', type: 'success' });

      setProductData({
        identifier: '',
        supplierId: '',
        warehouseName: '',
        category: ''
      });

    } catch (err) {
      setMessage({
        text: "Registration Failed: " + (err.response?.data?.message || "Server Error"),
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect (() => {
    const closeMenu = () => setShowDropDown(false);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []); 

  useEffect(() => {
    const closeMenus = () => {
      setShowDropDown(false);
      setShowWarehouseDropDown(false);
    };
    window.addEventListener('click', closeMenus);
    return () => window.removeEventListener('click', closeMenus);
  }, []);

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FiPackage /> Add Product
        </h2>

        {message.text && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            value={productData.identifier}
            onChange={e => setProductData({ ...productData, identifier: e.target.value })}
          />

          <input
            type="number"
            placeholder="Supplier ID"
            className="w-full p-2 border rounded"
            value={productData.supplierId}
            onChange={e => setProductData({ ...productData, supplierId: e.target.value })}
          />

          <div className='relative' onClick={(e) => e.stopPropagation()}>
            <input 
              type="text"
              placeholder='Search Warehouse...'
              className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none'
              value={productData.warehouseName}
              onFocus={() => setShowWarehouseDropDown(true)}
              onChange={(e) => {
                const val = e.target.value;
                setProductData({...productData, warehouseName: val});
                setWarehouseSearchTerm(val);
              }}
              />

              {showWarehouseDropDown && (warehouses.length > 0 || isSearchingWarehouse) && (
                <ul className='absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lgmax-h-60 overflow-auto'>
                  {isSearchingWarehouse ? (
                    <li className='p-2 text-sm text-gray-400'>Searching...</li>
                  ): (
                    warehouses.map((wh, idx) => (
                      <li 
                        key={wh.id || idx}
                        className='p-2 text-sm hover:bg-blue-600 hover:text-white cursor-pointer border-b:border-none'
                        onClick={() => {
                          setProductData({...productData, warehouseName: wh.identifier});
                          setShowWarehouseDropDown(false);
                          setWarehouses([]);
                        }}
                        >
                          {wh.identifier}
                        </li>
                    ))
                  )}
                </ul>
              )}
          </div>

          <div className='relative'
            onClick={(e) => e.stopPropagation()}>
            <input 
              type="text"
              placeholder='Search Category...'
              className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none'
              value={productData.category}
              onFocus={() => setShowDropDown(true)}
              onChange={(e) => {
                const val = e.target.value;
                setProductData({...productData, category: val});
                setSearchTerm(val);
              }}
            />

            {showDropDown && (categories.length > 0 || isSearching) && (
              <ul className='absolute left-0 right-0 z-[100] w-full bg-white border border-gray-300 rounded-md mt-1 shadow-2x1 max-h-60 overflow-auto'>
                {isSearching ? (
                  <li className='p-3 text-sm text-gray-500 italic bg-gray-50'>Searching...</li>
                ) : (
                  categories.map((cat, idx) => (
                    <li
                      key={cat.id || idx}
                      className='p-3 text-sm text-gray-800 hover:bg-blue-600 hover:text-white cursor-pointer border-b border-gray-100 last:border-none transition-colors'
                      onClick={() => {
                        setProductData({...productData, category: cat.identifier });
                        setShowDropDown(false);
                        setCategories([]);
                      }}
                      >
                        {cat.identifier}
                      </li>
                  ))
                )}
              </ul>
            )}
          </div>

          <button 
            type="submit"
            className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium'>
                <FiSave /> Add Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProductRegistration;