import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import EditPage from "../../components/common/EditPage";

const WarehouseEdit = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, [identifier]);

  const load = async () => {
    try {
      const res = await api.get("/warehouse/get", {
        params: { identifier }
      });

      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <EditPage
      title="Edit Warehouse"
      modelName="warehouse"
      initialForm={{
        identifier: data.identifier || "",
        warehouseName: data.warehouseName || "",
        country: data.country || "",
        state: data.state || "",
        cityName: data.cityName || "",
        location: data.location || ""
      }}
      fields={[
        { name: "identifier", label: "Identifier", type: "text", disabled: true },
        { name: "warehouseName", label: "Warehouse Name", type: "text" },
        { name: "country", label: "Country", type: "text" },
        { name: "state", label: "State", type: "text" },
        { name: "cityName", label: "City", type: "text" },
        { name: "location", label: "Location", type: "text" }
      ]}
      validate={(f) => {
        if (!f.warehouseName) return "Warehouse name required";
        if (!f.country) return "Country required";
        if (!f.state) return "State required";
        if (!f.cityName) return "City required";
        if (!f.location) return "Location required";

        if (f.warehouseName.length < 3 || f.warehouseName.length > 50)
          return "Warehouse name must be 3–50 characters";

        if (f.country.length < 2 || f.country.length > 50)
          return "Country must be 2–50 characters";

        if (f.state.length < 2 || f.state.length > 50)
          return "State must be 2–50 characters";

        if (f.cityName.length < 2 || f.cityName.length > 50)
          return "City must be 2–50 characters";

        if (f.location.length < 5 || f.location.length > 100)
          return "Location must be 5–100 characters";

        return null;
      }}
      onSuccess={() => navigate("/warehouse")}
      onCancel={() => navigate("/warehouse")}
    />
  );
};

export default WarehouseEdit;