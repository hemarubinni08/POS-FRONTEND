import { useEffect, useState } from "react";
import axios from "axios";

import EditModal from "../EditModal";
import Brands from "../../pages/dropdown/Brands";
import Models from "../../pages/dropdown/Models";
import Categories from "../../pages/dropdown/Categories";
import Units from "../../pages/dropdown/Units";

const Edit = ({
  isOpen,
  onClose,
  item,
  onUpdateSuccess,
}) => {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [models, setModels] = useState([]);
  const [units, setUnits] = useState([]);

  // Load selected item into form
  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  // Fetch dropdown data
  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      try {
        const [b, c, m, u] = await Promise.all([
          axios.get("http://localhost:8080/api/brands/list", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/categories/list", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/models/list", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8080/api/units/list", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBrands(b.data || []);
        setCategories(c.data || []);
        setModels(m.data || []);
        setUnits(u.data || []);
      } catch (err) {
        console.error("Dropdown load failed", err);
      }
    };

    fetchData();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/product/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onUpdateSuccess(formData);
      onClose();

    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

        <h2 className="text-2xl font-bold mb-4">
          Edit Product
        </h2>

        <div className="space-y-4">
        
         <EditModal
            formData={formData}
            handleChange={handleChange}
            />

          {/* Brand */}
          <div>
            <Brands formData={formData}
                handleChange={handleChange}/>
                        </div>

          {/* Category */}
          <div>
            <Categories formData={formData}
                handleChange={handleChange}/>
          </div>

          {/* Model */}
          <div>
            <Models formData={formData}
                handleChange={handleChange}/>
          </div>

          {/* Unit */}
          <div>
            <Units formData={formData}
                handleChange={handleChange}/>
          </div>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default Edit;