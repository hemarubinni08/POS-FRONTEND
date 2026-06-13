import Layout from "../../components/layout/Layout";
import DynamicForm from "../../components/common/DynamicForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

const CategoryForm = () => {
  const { id } = useParams();

  const [initialData, setInitialData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);

      let categoryData = {};

      // ✅ 1. FETCH EDIT DATA
      if (id) {
        const res = await api.get(`/api/category/get?identifier=${id}`);
        categoryData = res.data;

        // ✅ Flatten superCategory → string
        categoryData.superCategory = String(
          categoryData.superCategory?.identifier || ""
        );
      }

      // ✅ 2. FETCH CATEGORY LIST
      const listRes = await api.post("/api/category/list", {
        page: 0,
        sizePerPage: 100,
      });

      let list = [];

      if (Array.isArray(listRes.data.dtoList)) {
        list = listRes.data.dtoList;
      } else {
        console.error("❌ Unexpected API format:", listRes.data);
      }

      // ✅ 3. REMOVE SELF (edit mode)
      if (id) {
        list = list.filter((cat) => cat.identifier !== id);
      }

      // ✅ 4. CREATE OPTIONS
      const options = list.map((cat) => ({
        label: cat.identifier,
        value: cat.identifier,
      }));

      // ✅ 5. Ensure selected value exists
      if (categoryData.superCategory) {
        const exists = options.some(
          (opt) => opt.value === categoryData.superCategory
        );
        if (!exists) {
          categoryData.superCategory = "";
        }
      }

      // ✅ 6. SET STATE
      setCategories(options);
      setInitialData(categoryData);

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
          title={id ? "Edit Category" : "Add Category"}
          saveApi="/api/category/add"
          updateApi="/api/category/update"
          redirectUrl="/category/list"

          // ✅ IMPORTANT FIX (no JSX comment here)
          idField="identifier"

          initialData={initialData}
          fields={[
            {
              name: "identifier",
              label: "Category Name",
              type: "text",
              disabled: !!id,
              helper: id
                ? "Category name cannot be changed"
                : "This will be used as the category identifier",
            },
            {
              name: "superCategory",
              label: "Super Category",
              type: "select",
              helper: "Leave empty to create a top-level category",
              options: [
                { label: "-- None --", value: "" },
                ...categories,
              ],
            },
          ]}
        />
      )}
    </Layout>
  );
};

export default CategoryForm;