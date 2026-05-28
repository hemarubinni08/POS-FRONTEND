import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import EditPage from "../../components/common/EditPage";

const UnitEdit = () => {

  const { identifier } = useParams();

  const navigate = useNavigate();

  const [unitData, setUnitData] = useState(null);

  useEffect(() => {
    loadUnit();
  }, [identifier]);

  const loadUnit = async () => {

    try {

      const res = await api.get("/unit/get", {
        params: { identifier }
      });

      setUnitData(res.data);

    } catch (err) {

      console.log("Load unit error:", err);

    }
  };

  if (!unitData) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <EditPage
      title="Edit Unit"
      modelName="unit"

      fields={[
        {
          name: "identifier",
          label: "Identifier",
          type: "text",
          disabled: true
        },
        {
          name: "unitName",
          label: "Unit Name",
          type: "text",
          disabled: true
        },
        {
          name: "status",
          label: "Status",
          type: "status"
        }
      ]}

      initialForm={{
        identifier: unitData.identifier || "",
        unitName: unitData.unitName || "",
        status: Boolean(unitData.status)
      }}

      validate={() => null}

      onSuccess={() => navigate("/unit")}
      onCancel={() => navigate("/unit")}
    />
  );
};

export default UnitEdit;