import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import EditPage from "../../components/common/EditPage";
import { getCategories } from "../../components/common/DataDropdowns";

const CategoryEdit = () => {

  const { identifier } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [options, setOptions] = useState({});

  useEffect(() => {
    loadCategory();
    loadMaster();
  }, [identifier]);

  const loadCategory = async () => {

    try {

      const res = await api.get("/category/get", {
        params: { identifier }
      });
      setForm(res.data);
    } catch (err) {
      console.log("Failed to load category", err);
    }
  };

  const loadMaster = async () => {

    setOptions({

      superCategoryIdentifier:
        (await getCategories()).map(c => ({
          identifier: c.identifier,
          label: c.name
        }))
    });
  };

  if (!form) {

    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (

    <EditPage

      title="Edit Category"
      modelName="category"
      initialForm={form}
      options={options}

      fields={[
        {name: "identifier",label: "Identifier",type: "text",disabled: true},
        {name: "name",label: "Category Name",type: "text"},
        { name: "superCategoryIdentifier",label: "Parent Category",type: "select"}
      ]}

      validate={(form) => {
        if (!form.identifier) return "Identifier is required";
        if (!form.name) return "Category name is required";
        if (form.name.trim().length < 3) return "Category name must be at least 3 characters";
        return null;
      }}

      onSuccess={() => navigate("/category")}
      onCancel={() => navigate("/category")}

    />
  );
};

export default CategoryEdit;