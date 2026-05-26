import AddPage from "../../components/common/AddPage";
import { useNavigate } from "react-router-dom";

const WarehouseAdd = () => {
  const navigate = useNavigate();

  return (
    <AddPage
      title="Add Warehouse"
      modelName="warehouse"
      initialForm={{
        identifier: "",
        warehouseName: "",
        country: "",
        state: "",
        cityName: "",
        location: ""
      }}
      fields={[
        { name: "identifier", label: "Identifier", type: "text" },
        { name: "warehouseName", label: "Warehouse Name", type: "text" },
        { name: "country", label: "Country", type: "text" },
        { name: "state", label: "State", type: "text" },
        { name: "cityName", label: "City", type: "text" },
        { name: "location", label: "Location", type: "text" }
      ]}
      validate={(f) => {
        if (!f.identifier) return "Identifier required";
        if (!f.warehouseName) return "Warehouse name required";
        if (!f.country) return "Country required";
        if (!f.state) return "State required";
        if (!f.cityName) return "City required";
        if (!f.location) return "Location required";

        if (f.identifier.length < 3 || f.identifier.length > 20)
          return "Identifier must be 3–20 characters";

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

export default WarehouseAdd;