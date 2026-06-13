import Layout from "../../components/layout/Layout";
import DynamicForm from "../../components/common/DynamicForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

const WarehouseForm = () => {
  const { id } = useParams();   // identifier comes from URL
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      setLoading(true);

      try {
        const res = await api.get(`/api/warehouse/get?identifier=${id}`);
        setInitialData(res.data);
      } catch (err) {
        console.error("❌ Fetch failed", err);
      } finally {
        setLoading(false);
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
          title={id ? "Edit Warehouse" : "Add Warehouse"}
          saveApi="/api/warehouse/add"
          updateApi="/api/warehouse/update"
          redirectUrl="/warehouse/list"
          idField="id"   // ✅ IMPORTANT (use id, not identifier)
          initialData={initialData}
          fields={[
            {
              name: "identifier",
              label: "Warehouse Name",
              type: "text",
              disabled: !!id,  // ✅ readonly in edit
            },
            {
              name: "location",
              label: "Location",
              type: "text",
            },
            {
              name: "capacity",
              label: "Capacity",
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

export default WarehouseForm;