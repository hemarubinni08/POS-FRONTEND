import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonEdit from "../../components/CommonEdit";
import {getItem, updateItem,} from "../../services/api";

function EditRole() {

  const { identifier } = useParams();

  const navigate = useNavigate();

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  useEffect(() => {

    loadRole();

  }, []);

  const loadRole = async () => {

    try {

      setPageLoading(true);

      const response = await getItem(
        "role",
        identifier
      );

      setDescription(
        response.description || ""
      );

    } catch (error) {

      console.error(error);

      setError(
        "Failed to load role"
      );

    } finally {

      setPageLoading(false);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccessMessage("");

    try {

      setLoading(true);

      const response = await updateItem(
        "role",
        {
          identifier,
          description,
        }
      );

      if (!response.success) {

        setError(
          response.message ||
          "Failed to update role"
        );

        return;

      }

      setSuccessMessage(
        "Role updated successfully"
      );

      setTimeout(() => {

        navigate("/roles");

      }, 1000);

    } catch (error) {

      console.error(error);

      setError(
        "Failed to update role"
      );

    } finally {

      setLoading(false);

    }

};

  if (pageLoading) {

    return (

      <div className="flex items-center justify-center h-125">

        <div className="text-gray-500 text-lg font-medium">

          Loading...

        </div>

      </div>

    );
}


  return (

    <CommonEdit
      title="Edit Role"
      subtitle="Update Role"
      identifier={identifier}
      setIdentifier={() => {}}
      description={description}
      setDescription={setDescription}
      loading={loading}
      error={error}
      successMessage={successMessage}
      onSubmit={handleSubmit}
      cancelPath="/roles"
    >

    </CommonEdit>

  );

}

export default EditRole;