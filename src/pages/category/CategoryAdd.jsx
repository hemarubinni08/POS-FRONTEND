import { useNavigate } from "react-router-dom";
import AddPage from "../../components/common/AddPage";
import { useEffect, useState } from "react";
import { getCategories } from "../../components/common/DataDropdowns";

const CategoryAdd = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState({});

  useEffect(() => {
    loadMaster();
  }, []);

  const loadMaster = async () => {
    setOptions({
      superCategoryIdentifier: (await getCategories()).map(c => ({
        identifier: c.identifier,
        label: c.name
      }))
    });
  };

  return (
    <AddPage
      title="Add Category"
      modelName="category"

      initialForm={{
        identifier: "",
        name: "",
        superCategoryIdentifier: ""
      }}

      options={options}

      fields={[
        { name: "identifier", label: "Identifier", type: "text" },
        { name: "name", label: "Name", type: "text" },
        { name: "superCategoryIdentifier", label: "Parent Category", type: "select" }
      ]}

      validate={(form) => {
        if (!form.identifier) return "Identifier required";
        if (!form.name) return "Name required";
        return null;
      }}

      onSuccess={() => navigate("/category")}
      onCancel={() => navigate("/category")}
    />
  );
};

export default CategoryAdd;