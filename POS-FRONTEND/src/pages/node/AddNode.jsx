import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonAdd from "../../components/CommonAdd";
import MultiCheckBox from "../../components/MultiCheckBox";
import { addItem } from "../../services/api";

function AddNode() {

  const navigate = useNavigate();

  const [identifier, setIdentifier] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [path, setPath] =
    useState("");

  const [roles, setRoles] =
    useState([]);

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

    if (roles.length === 0) {

      setError(
        "Please select at least one role"
      );

      return;

    }

    try {

      setLoading(true);

      const response = await addItem(
        "node",
        {
          identifier,
          description,
          path,
          roles,
          status: true,
        }
      );

      if (!response.success) {

        setError(
          response.message ||
          "Failed to create node"
        );

        return;

      }

      setSuccessMessage(
        "Node created successfully"
      );

      setTimeout(() => {

        navigate("/nodes");

      }, 1000);

    } catch (error) {

      console.error(error);

      setError(
        "Failed to create node"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <CommonAdd
      title="Add Node"
      subtitle="Create a new navigation node"
      identifier={identifier}
      setIdentifier={setIdentifier}
      description={description}
      setDescription={setDescription}
      loading={loading}
      error={error}
      successMessage={successMessage}
      onSubmit={handleSubmit}
      cancelPath="/nodes"
    >

      {/* PATH */}

      <div>

        <label className="block text-sm font-medium text-[#344054] mb-3">

          Path

        </label>

        <input
          type="text"

          value={path}

          onChange={(e) =>
            setPath(e.target.value)
          }

          required

          minLength={2}

          maxLength={100}

          pattern="\/.*"

          title="Path must start with /"

          placeholder="/products"

          className="w-full h-14 px-5 rounded-2xl border border-[#d0d5dd] bg-white text-[#101828] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
        />

      </div>

      {/* ROLES */}

      <MultiCheckBox
        label="Roles"
        model="role"
        values={roles}
        onChange={setRoles}
        required={true}
      />

    </CommonAdd>

  );

}

export default AddNode;