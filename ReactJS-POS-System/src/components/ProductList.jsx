import { useState, useEffect } from 'react';
import { FiLayers } from 'react-icons/fi';
import Modal from './Modal';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ProductRegistration from './ProductRegistration';
import ProductEdit from "./ProductEdit";
import CommonList from './CommonList';
import api from '../api/axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [sizePerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const productColumns = [
    { header: "Identifier", key: "identifier"},
    { header: "Category", key: "category"},
    { header: "Warehouse", key: "warehouseName"},
    { header: "Supplier ID", key: "supplierId"},
    { header: "Status", key: 'status'}
  ];

  const getPageNumbers = () => {
    if (!totalPage || totalPage <= 0) return [];
    const maxVisible = 5;
    let start = Math.max(0, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPage, start + maxVisible);

    if (end - start < maxVisible) {
      start = Math.max(0, end - maxVisible);
    }

    return Array.from({ length: end - start }, (_, i) => start + i);
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

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditMode(false);
    setSelectedProduct(null);
    setEditingProduct(null);
    fetchProducts();
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/product/list', {
        page,
        sizePerPage,
        sortDirection: 'ASC',
        sortField: 'identifier'
      });

      const data = response.data.dtoList || [];
      setProducts(data);
      setTotalPage(response.data.totalPage);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!searchTerm.trim()) {
      setDisplayProducts(products);
      return;
    }

    const filtered = products.filter(p =>
      p.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setDisplayProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleToggleStatus = async (product) => {
    const originalStatus = product.status;
    const newStatus = !originalStatus;

    setProducts(prev =>
      prev.map(p =>
        p.identifier === product.identifier
          ? { ...p, status: newStatus }
          : p
      )
    );

    try {
      const response = await api.post('/api/product/update', {
        ...product,
        status: newStatus
      });

      if (!response.data.success) throw new Error("Update failed");
    } catch (err) {
      console.error(err);
      setProducts(prev =>
        prev.map(p =>
          p.identifier === product.identifier
            ? { ...p, status: originalStatus }
            : p
        )
      );
    }
  };

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(`Delete product ${product.identifier}?`);
    if (!confirmDelete) return;

    const original = [...products];
    setProducts(prev => prev.filter(p => p.identifier !== product.identifier));

    try {
      await api.post('/api/product/delete', {
        identifier: product.identifier
      });
    } catch (err) {
      console.error(err);
      setProducts(original);
    }
  };

  return (
    <div className="w-full">
      <CommonList
  title="Product Inventory"
  icon={FiLayers}
  columns={productColumns}
  data={displayProducts}
  loading={loading}
  onAdd={handleAddClick}
  onEdit={handleEditClick}
  onDelete={handleDelete}
  pagination={{
    page,
    totalPage,
    setPage,
    getPageNumbers
  }}
  headerExtras={
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
            onClick={() => {setSearchTerm(''), setPage(0);}}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
        )}
        </div>
  }
  renderCustomCell={(key, item) => {
    if (key === 'status') {
      return (
        <label className='relative inline-flex items-center cursor-pointer'>
          <input
            type="checkbox"
            className='sr-only peer'
            checked={item.status}
            onChange={() => handleToggleStatus(item)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          
          <span className={`ml-3 w-24 text-sm font-medium uppercase transition-colors duration-200 ${
            item.status ? 'text-green-600' : 'text-red-600'
          }`}>
            {item.status ? 'IN-STOCK' : 'OUT-STOCK'}
          </span>
        </label>
      );
    }

    return item[key];
  }}
/>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        {isEditMode ? (
          <ProductEdit
            key={selectedProduct?.identifier}
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        ) : (
          <ProductRegistration onClose={handleCloseModal} />
        )}
      </Modal>
    </div>
  );
};

export default ProductList;