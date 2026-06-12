import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonEdit from "../../components/CommonEdit";
import MultiCheckBox from "../../components/MultiCheckBox";
import {getItem, updateItem,} from "../../services/api";

function EditNode() {

  const { identifier } = useParams();

  const navigate = useNavigate();

  const [description, setDescription] =
    useState("");

  const [path, setPath] =
    useState("");

  const [roles, setRoles] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  useEffect(() => {

    loadNode();

  }, []);

  const loadNode = async () => {

    try {

      setPageLoading(true);

      const response = await getItem(
        "node",
        identifier
      );

      setDescription(
        response.description || ""
      );

      setPath(
        response.path || ""
      );

      setRoles(
        response.roles || []
      );

    } catch (error) {

      console.error(error);

      setError(
        "Failed to load node"
      );

    } finally {

      setPageLoading(false);

    }

  };

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

      const response = await updateItem(
        "node",
        {
          identifier,
          description,
          path,
          roles,
        }
      );

      if (!response.success) {

        setError(
          response.message ||
          "Failed to update node"
        );

        return;

      }

      setSuccessMessage(
        "Node updated successfully"
      );

      setTimeout(() => {

        navigate("/nodes");

      }, 1000);

    } catch (error) {

      console.error(error);

      setError(
        "Failed to update node"
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
      title="Edit Node"
      subtitle="Update navigation node"
      identifier={identifier}
      setIdentifier={() => {}}
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

        <p className="text-sm text-[#667085] mt-2">

          Path must start with /

        </p>

      </div>

      {/* ROLES */}

      <MultiCheckBox
        label="Roles"
        model="role"
        values={roles}
        onChange={setRoles}
        required={true}
      />

    </CommonEdit>

  );

}

export default EditNode;