import { useNavigate } from "react-router-dom";
import AddPage from "../../components/common/AddPage";

const UnitAdd = () => {

  const navigate = useNavigate();

  return (
    <AddPage
      title="Add Unit"
      modelName="unit"

      fields={[
        {
          name: "unitName",
          label: "Unit Name",
          type: "text"
        },
        {
          name: "status",
          label: "Status",
          type: "status"
        }
      ]}

      initialForm={{
        unitName: "",
        status: true
      }}

      validate={(form) => {

        if (!form.unitName?.trim()) {
          return "Unit name is required";
        }

        return null;
      }}

      onSuccess={() => navigate("/unit")}
      onCancel={() => navigate("/unit")}
    />
  );
};

export default UnitAdd;