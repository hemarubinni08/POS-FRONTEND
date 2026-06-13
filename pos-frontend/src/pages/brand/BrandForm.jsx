import Layout from "../../components/layout/Layout";
import DynamicForm from "../../components/common/DynamicForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

const BrandForm = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false); // ✅ NEW

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true); // ✅ start loading

      try {
        const res = await api.get(`/api/brand/get?identifier=${id}`);
        setInitialData(res.data);
      } catch (err) {
        console.error("❌ Fetch failed", err);
      } finally {
        setLoading(false); // ✅ stop loading
      }
    };

    fetchData();
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <div className="text-center p-4">Loading...</div>
      ) : (
        <DynamicForm
          title={id ? "Edit Brand" : "Add Brand"}
          saveApi="/api/brand/add"
          updateApi="/api/brand/update"
          redirectUrl="/brand/list"
          idField="id"
          initialData={initialData}
          fields={[
            {
              name: "identifier",
              label: "Brand Name",
              type: "text",
              disabled: !!id,  // ✅ OPTIONAL (disable in edit)
            },
            {
              name: "description",
              label: "Description",
              type: "textarea",
            },
          ]}
        />
      )}
    </Layout>
  );
};


export default BrandForm;
