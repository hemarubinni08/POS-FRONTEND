import { useEffect, useState } from "react";
import api from "../../services/api";
import {
  getBrands,
  getModels,
  getUnits,
  getCategories
} from "../../services/masterData";
import FormRenderer from "../../components/common/FormRenderer";

const ProductEdit = ({ identifier, onSuccess, onCancel }) => {

  const [form, setForm] = useState({
    identifier: "",
    productName: "",
    brand: "",
    model: "",
    unit: "",
    categories: []
  });

  const [options, setOptions] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const res = await api.get("/api/product/get", {
        params: { identifier }
      });

      setForm({
        ...res.data,
        categories: res.data.categories || []
      });

      setOptions({
        brand: (await getBrands()).map(b => ({
          identifier: b.identifier,
          label: b.brandName
        })),

        model: (await getModels()).map(m => ({
          identifier: m.identifier,
          label: m.modelName
        })),

        unit: (await getUnits()).map(u => ({
          identifier: u.identifier,
          label: u.unitName
        })),

        categories: (await getCategories()).map(c => ({
          identifier: c.identifier,
          label: c.name
        }))
      });

    } catch {
      setError("Failed to load product");
    }
  };

  const fields = [
    {
      name: "identifier",
      label: "Identifier",
      type: "text",
      disabled: true
    },
    {
      name: "productName",
      label: "Product Name",
      type: "text"
    },
    {
      name: "brand",
      label: "Brand",
      type: "select"
    },
    {
      name: "model",
      label: "Model",
      type: "select"
    },
    {
      name: "unit",
      label: "Unit",
      type: "select"
    },
    {
      name: "categories",
      label: "Categories",
      type: "multicheck"
    }
  ];

  const validate = () => {
    if (!form.productName.trim()) return "Product Name required";
    if (!form.brand) return "Brand required";
    if (!form.model) return "Model required";
    if (!form.unit) return "Unit required";
    if (!form.categories.length) return "Select categories";
    return null;
  };

  const submit = async () => {

    setError("");
    setSuccess("");

    const validation = validate();

    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);

    try {

      const res = await api.post("/api/product/update", form);

      const data = res.data;

      if (data.success === false) {
        setError(data.message || "Update failed");
        return;
      }

      setSuccess("Product updated successfully");

      setTimeout(() => {
        onSuccess();
      }, 700);

    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded">
          {success}
        </div>
      )}

      <FormRenderer
        fields={fields}
        form={form}
        setForm={setForm}
        options={options}
      />

      <div className="flex gap-3">

        <button
          onClick={submit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded w-full"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 p-3 rounded w-full"
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default ProductEdit;