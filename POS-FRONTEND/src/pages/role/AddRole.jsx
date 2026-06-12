import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonAdd from "../../components/CommonAdd";
import MultiCheckBox from "../../components/MultiCheckBox";
import { addItem } from "../../services/api";

function AddRole() {

  const navigate = useNavigate();

  const [identifier, setIdentifier] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccessMessage("");

    try {

      setLoading(true);

      const response = await addItem(
        "role",
        {
          identifier,
          description,
          status: true,
        }
      );

      if (!response.success) {

        setError(
          response.message ||
          "Failed to create Role"
        );

        return;

      }

      setSuccessMessage(
        "Role created successfully"
      );

      setTimeout(() => {

        navigate("/roles");

      }, 1000);

    } catch (error) {

      console.error(error);

      setError(
        "Failed to create Role"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <CommonAdd
      title="Add Role"
      subtitle="Create a new Role for the system"
      identifier={identifier}
      setIdentifier={setIdentifier}
      description={description}
      setDescription={setDescription}
      loading={loading}
      error={error}
      successMessage={successMessage}
      onSubmit={handleSubmit}
      cancelPath="/roles"
    >

    </CommonAdd>

  );

}

export default AddRole;