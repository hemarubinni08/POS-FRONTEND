import { useNavigate } from "react-router-dom";
import AddPage from "../../components/common/AddPage";

const ShelfAdd = () => {

  const navigate = useNavigate();

  return (

    <AddPage
      title="Add Shelf"
      modelName="shelf"

      initialForm={{
        name: "",
        status: true
      }}

      fields={[

        {
          name: "name",
          label: "Shelf Name",
          type: "text"
        },

        {
          name: "status",
          label: "Status",
          type: "status"
        }

      ]}

      validate={(form) => {

        if (!form.name)
          return "Shelf name required";

        return null;
      }}

      onSuccess={() => navigate("/shelf")}
      onCancel={() => navigate("/shelf")}
    />

  );
};

export default ShelfAdd;