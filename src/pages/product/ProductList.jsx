import { useEffect, useState } from "react";
import api from "../../services/api";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import ProductAdd from "./ProductAdd";
import ProductEdit from "./ProductEdit";

const ProductList = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedIdentifier, setSelectedIdentifier] = useState("");

  const fetchData = async () => {

    setLoading(true);

    try {

      const res = await api.post("/api/product/list", {
        page: 0,
        sizePerPage: 100
      });

      setData(res.data || []);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (identifier) => {

    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    await api.post("/api/product/delete", {
      identifier
    });

    fetchData();
  };

  const handleEdit = (item) => {
    setSelectedIdentifier(item.identifier);
    setOpenEdit(true);
  };

  const columns = [
    "identifier",
    "productName",
    "brand",
    "model",
    "unit"
  ];

  const formattedData = data.map((p) => ({
    ...p,
    categories: p.categories?.join(", ") || "-"
  }));

  return (
    <div className="p-6">

      <div className="flex justify-between mb-4">

        <h2 className="text-xl font-bold">
          Products
        </h2>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Product
        </button>

      </div>

      <DataTable
        columns={[...columns, "categories"]}
        data={formattedData}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal open={openAdd}>

        <ProductAdd
          onSuccess={() => {
            setOpenAdd(false);
            fetchData();
          }}
          onCancel={() => setOpenAdd(false)}
        />

      </Modal>

      <Modal open={openEdit}>

        <ProductEdit
          identifier={selectedIdentifier}
          onSuccess={() => {
            setOpenEdit(false);
            fetchData();
          }}
          onCancel={() => setOpenEdit(false)}
        />

      </Modal>

    </div>
  );
};

export default ProductList;