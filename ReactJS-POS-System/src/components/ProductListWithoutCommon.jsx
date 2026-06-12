import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMoreVertical, FiEdit2, FiTrash2, FiArrowLeft, FiLayers } from 'react-icons/fi';
import Modal from './Modal';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductRegistration from './ProductRegistration';
import ProductEdit from "./ProductEdit";
import CommonList from './CommonList';
import api from '../api/axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sizePerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);

  const productColumns = [
    { header: "Identifier", key: "identifier"},
    { header: "Category", key: "category"},
    { header: "Warehouse", key: "warehouseName"},
    { header: "Supplier ID", key: "supplierId"},
    { header: "Status", key: 'status'}
  ];

  const getPageNumbers = () => {
    if(!totalPage || totalPage <= 0) return [];
    const maxVisible = 5;
    let start = Math.max(0, page-Math.floor(maxVisible / 2));
    let end = Math.min(totalPage, start+maxVisible);
    if(end - start < maxVisible)
    {
      start = Math.max(0, end-maxVisible);
    }
    const pages = [];
    for(let i=start;i<end;i++)
    {
      pages.push(i);
    }
    return pages;
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setSelectedProduct(null);
    setEditingProduct(null);
    setOpenModal(true);
  };

  const handleEditClick = (product) => {
    setIsEditMode(true);
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditMode(false);
    setSelectedProduct(null);
    setEditingProduct(null);
    fetchProducts();
  }

  const fetchProducts = async () => {
    setLoading(true);
    try{
      const response = await api.post('/api/product/list',
        {
          page: page,
          sizePerPage: sizePerPage,
          sortDirection: 'ASC',
          sortField: 'identifier'
        }
      );
      const data = response.data.dtoList || [];
      setProducts(data);
      setTotalPage(response.data.totalPage);
    }
    catch (err)
    {
      console.error("Failed to fetch products", err);
      setProducts([]);
    }
    finally
    {
      setLoading(false);
    }
  };
  useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
      if(page !== 0)
      {
        setPage(0);
      }
      else
      {
        fetchProducts(searchTerm);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if(!searchTerm.trim())
    {
      setDisplayProducts(products);
      return;
    }
    const filtered = products.filter( p => 
      p.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    fetchProducts();
  }, [page]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);
  
  const handleToggleStatus = async (product) => {
    const originalStatus = product.status;
    const newStatus = !originalStatus;

    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.identifier === product.identifier ? {...p, status: newStatus} : p
      )
    );

    try{
      const response = await api.post('/api/product/update', {...product, status: newStatus});

      if(!response.data.success)
      {
        throw new Error(response.data.message || "Failed to update");
      }
    }
    catch(err)
    {
      console.error("Status toggle failed:", err);
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.identifier == product.identifier ? { ...p, status: originalStatus} : p
        )
      );
      alert("Could not update status: "+ err.message);
    }
  };

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(`Delete product ${product.identifier}?`);
    if (!confirmDelete) return;

    const originalProduct = [...products];

    setProducts(prev =>
      prev.filter(p => p.identifier !== product.identifier)
    );

    try{
      const response = await api.post('/api/product/delete',{identifier: (product.identifier)});
      if(!response.data)
      {
        throw new Error("Delete failed");
      }
    }
    catch(err)
    {
      console.error("Delete failed:", err);
      setProducts(originalProduct);
      alert("Could not delete product: "+err.message);
    }
  };
  useEffect(() => {
    if(openModal)
    {
      document.body.style.overflow = 'hidden';
    }
    else
    {
      document.body.style.overflow = 'auto';
    }

    return () =>
    {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);

  return (<div className="w-full">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
            <FiLayers className="text-blue-600" /> Product Inventory
          </h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:w-72">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => {setSearchTerm(''); setPage(0);}}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
            </div>
          </div>
          <button onClick={handleAddClick} className="hover:bg-blue-600 hover:text-white px-3 py-1 rounded-md text-sm transition">
            Add Product
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-x1 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Identifier</th>
                <th className="p-4 font-semibold text-gray-600">Category</th>
                <th className="p-4 font-semibold text-gray-600">Warehouse</th>
                <th className="p-4 font-semibold text-gray-600">Supplier ID</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className='p-4 font-semibold text-gray-600'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="p-8 text-center text-gray-400">Loading inventory...</td></tr>
              ) : displayProducts.length > 0 ? (
                displayProducts.map((p, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{p.identifier}</td>
                    <td className="p-4 text-gray-600">{p.category}</td>
                    <td className="p-4 text-gray-600">{p.warehouseName}</td>
                    <td className="p-4 text-gray-600">{p.supplierId}</td>
                    <td className='p-4'>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type="checkbox"
                          className='sr-only peer'
                          checked={p.status}
                          onChange={() => handleToggleStatus(p)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className={`ml-3 w-24 text-sm font-medium text-gray-500 uppercase transition-colors duration-200 ${
                          p.status ? 'text-green-600' : 'text-red-600'}`}>
                          {p.status ? 'IN-STOCK' : 'OUT-STOCK'}
                        </span>
                       </label>
                    </td>
                    <td className='p-4 relative'>
                      <div className='relative inline-block' onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setActiveMenu(activeMenu === idx ? null : idx )} className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${activeMenu === idx ? 'bg-blue-100' : 'hover:bg-gray-100'}`}>
                          <FiMoreVertical className="text-gray-500"/>
                        </button>
                        {activeMenu === idx && (
                        <div className={`absolute right-0 w-32 bg-white border border-gray-200 rounded-lg shadow-x1 z-50 py-2 text-left
                          ${idx === products.length - 1 ? 'bottom-full mb-1' : 'top-full mt-1'}`}>
                          <button
                            onClick={() => {handleEditClick(p); setActiveMenu(null);}}
                            className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center gap-2'>
                              <FiEdit2 className='text-blue-600' /> Edit
                            </button>
                            <button 
                              onClick={() => {handleDelete(p); setActiveMenu(null);}}
                              className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2'>
                                <FiTrash2 /> Delete
                              </button>
                        </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="p-8 text-center text-gray-400">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
              
        <div className="flex justify-center items-center mt-6 px-2 pb-8 max-w-5x1 mx-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(prev => Math.max(0, prev - 1))}
              disabled={page === 0 || loading}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-all shadow-sm ${
                page === 0 || loading
                  ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              Previous
            </button>

            <div className='flex gap-1'>
              {getPageNumbers()[0] > 0 && (
                <>
                  <button onClick={() => setPage(0)} className='px-3 py-2 text-sm border rounded-full hover:bg-gray-50 transition-all'>1</button>
                  {getPageNumbers()[0] > 1 && <span className='px-1 text-gray-400'>...</span>}
                </>
              )}
              {getPageNumbers().map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-bold border transition-all duration-200 rounded-md ${
                    page === num
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-110'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blu-600'
                  }`}
                  >
                    {num + 1}
                  </button>
              ))}
              {getPageNumbers().slice(-1)[0] < totalPage - 1 && (
                <>
                  {getPageNumbers().slice(-1)[0] < totalPage - 2 && <span className='px-1 text-gray-400 self-center'>...</span>}
                  <button onClick={() => setPage(totalPage - 1)} className='px-2 py-2 text-sm border rounded-md hover:bg-gray-50'>{totalPage}</button>
                </>
              )}
            </div>

            <button
              onClick={() => setPage(prev => Math.min(totalPage - 1, prev + 1))}
              disabled={page >= totalPage - 1 || loading}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-all shadow-sm ${
                page >= totalPage - 1 || loading
                  ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
        <Modal isOpen={openModal} onClose={handleCloseModal}>
          {isEditMode ? (
            <ProductEdit
              key={selectedProduct?.identifier}
              product={selectedProduct}
              onClose={handleCloseModal}
              />   
          ) : (
            <ProductRegistration
              onClose={handleCloseModal}
              />
          )}
        </Modal>
    </div>
  );
};

export default ProductList;
