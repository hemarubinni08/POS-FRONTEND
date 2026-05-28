import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";
import EditPage from "../../components/common/EditPage";

const ShelfEdit = () => {

  const { identifier } = useParams();

  const navigate = useNavigate();

  const [initialForm, setInitialForm] = useState(null);

  useEffect(() => {
    loadShelf();
  }, [identifier]);

  const loadShelf = async () => {

    try {

      const res = await api.get("/shelf/get", {
        params: { identifier }
      });

      setInitialForm({
        identifier: res.data.identifier,
        name: res.data.name,
        status: Boolean(res.data.status)
      });

    } catch (err) {

      console.log(err);
      alert("Failed to load shelf");

    }
  };

  if (!initialForm) {
    return <div className="p-5">Loading...</div>;
  }

  return (

    <EditPage
      title="Edit Shelf"
      modelName="shelf"

      initialForm={initialForm}

      fields={[

        {
          name: "identifier",
          label: "Identifier",
          type: "text",
          disabled: true
        },

        {
          name: "name",
          label: "Shelf Name",
          type: "text",
          disabled: true
        },

        {
          name: "status",
          label: "Status",
          type: "status"
        }

      ]}

      validate={() => null}

      onSuccess={() => navigate("/shelf")}
      onCancel={() => navigate("/shelf")}
    />

  );
};

export default ShelfEdit;