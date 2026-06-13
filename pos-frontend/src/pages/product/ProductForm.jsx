import Layout from "../../components/layout/Layout";
import DynamicForm from "../../components/common/DynamicForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

const ProductForm = () => {

  // ✅ ✅ FIX: match router param name
  const { identifier } = useParams();

  const [initialData, setInitialData] = useState({});
  const [dropdowns, setDropdowns] = useState({
    categories: [],
    brands: [],
    models: [],
    units: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [identifier]);

  const fetchData = async () => {
    try {
      setLoading(true);

      let productData = {};

      // ✅ 1. FETCH PRODUCT (EDIT)
      if (identifier) {
        const res = await api.get(
          `/api/product/get?identifier=${identifier}`
        );

        productData = res.data;

        // ✅ flatten nested values
        productData.category =
          productData.category?.identifier || productData.category || "";

        productData.brand =
          productData.brand?.identifier || productData.brand || "";

        productData.model =
          productData.model?.identifier || productData.model || "";

        productData.unit =
          productData.unit?.identifier || productData.unit || "";
      }

      // ✅ 2. FETCH DROPDOWNS
      const [catRes, brandRes, modelRes, unitRes] = await Promise.all([
        api.post("/api/category/list", { page: 0, sizePerPage: 100 }),
        api.post("/api/brand/list", { page: 0, sizePerPage: 100 }),
        api.post("/api/model/list", { page: 0, sizePerPage: 100 }),
        api.post("/api/unit/list", { page: 0, sizePerPage: 100 }),
      ]);

      // ✅ COMMON extractor (backend uses dtoList)
      const extractList = (res) => {
        return Array.isArray(res.data.dtoList)
          ? res.data.dtoList
          : [];
      };

      // ✅ BUILD OPTIONS
      const categories = extractList(catRes).map((c) => ({
        label: c.identifier,
        value: c.identifier,
      }));

      const brands = extractList(brandRes).map((b) => ({
        label: b.identifier,
        value: b.identifier,
      }));

      const models = extractList(modelRes).map((m) => ({
        label: m.identifier,
        value: m.identifier,
      }));

      const units = extractList(unitRes).map((u) => ({
        label: u.identifier,
        value: u.identifier,
      }));

      // ✅ SET STATE
      setDropdowns({
        categories,
        brands,
        models,
        units,
      });

      setInitialData(productData);

    } catch (err) {
      console.error("❌ Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <DynamicForm
          title={identifier ? "Edit Product" : "Add Product"}
          saveApi="/api/product/add"
          updateApi="/api/product/update"
          redirectUrl="/product/list"

          // ✅ ✅ IMPORTANT: backend uses identifier
          idField="identifier"

          initialData={initialData}
          fields={[
            {
              name: "identifier",
              label: "Product Identifier",
              type: "text",
              disabled: !!identifier,
            },
            {
              name: "category",
              label: "Category",
              type: "select",
              options: [
                { label: "-- Select Category --", value: "" },
                ...dropdowns.categories,
              ],
            },
            {
              name: "brand",
              label: "Brand",
              type: "select",
              options: [
                { label: "-- Select Brand --", value: "" },
                ...dropdowns.brands,
              ],
            },
            {
              name: "model",
              label: "Model",
              type: "select",
              options: [
                { label: "-- Select Model --", value: "" },
                ...dropdowns.models,
              ],
            },
            {
              name: "unit",
              label: "Unit",
              type: "select",
              options: [
                { label: "-- Select Unit --", value: "" },
                ...dropdowns.units,
              ],
            },
            {
              name: "quantity",
              label: "Quantity",
              type: "number",
            },
            {
              name: "status",
              label: "Status",
              type: "select",
              options: [
                { label: "ACTIVE", value: true },
                { label: "INACTIVE", value: false },
              ],
            },
          ]}
        />
      )}
    </Layout>
  );
};

export default ProductForm;
