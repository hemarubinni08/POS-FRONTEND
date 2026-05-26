import { useState, useEffect } from "react";
import api from "../../services/api";
import FormRenderer from "./FormRenderer";

const EditPage = ({
  title,
  modelName,
  fields,
  options = {},
  initialForm,
  validate,
  onSuccess,
  onCancel
}) => {

  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* SAFE INIT */
  useEffect(() => {
    if (initialForm) {
      setForm(initialForm);
    }
  }, [initialForm]);

  /* SUBMIT */
  const submit = async () => {

    setError("");

    const err = validate?.(form);
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);

    try {
      await api.post(`/${modelName}/update`, form);

      onSuccess?.();

    } catch (e) {
      setError("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">

      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      {error && (
        <p className="text-red-600 mb-3">
          {error}
        </p>
      )}

      <FormRenderer
        fields={fields}
        form={form}
        setForm={setForm}
        options={options}
      />

      <div className="flex gap-3 mt-4">

        <button
          onClick={submit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Updating..." : "Update"}
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded w-full"
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default EditPage;