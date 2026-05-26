import { useState } from "react";
import api from "../../services/api";
import FormRenderer from "./FormRenderer";

const AddPage = ({
  title,
  modelName,
  fields,
  options = {},
  initialForm,
  validate,
  onSuccess,
  onCancel
}) => {

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError("");
    setSuccess("");

    const validation = validate?.(form);
    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(`/${modelName}/add`, form);

      if (res.data?.success === false) {
        setError(res.data.message || "Failed");
        return;
      }

      setSuccess("Saved successfully");

      setTimeout(() => {
        onSuccess?.();
      }, 800);

    } catch (e) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border">

        {/* HEADER */}
        <div className="mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>
          <p className="text-sm text-gray-500">
            Fill the details and click save
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-4 bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg">
            {success}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">
          <FormRenderer
            fields={fields}
            form={form}
            setForm={setForm}
            options={options}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">

          <button
            onClick={submit}
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
};

export default AddPage;