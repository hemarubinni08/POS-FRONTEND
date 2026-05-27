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

      const res = await api.post(
        `/${modelName}/add`,
        form
      );

      if (res.data?.success === false) {

        setError(res.data.message || "Failed");
        return;
      }

      setSuccess("Saved successfully");

      setTimeout(() => {

        onSuccess?.();

      }, 700);

    } catch (e) {

      setError("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-green-50 to-emerald-100 p-6">

      <div className="max-w-4xl mx-auto">

        {/* CARD */}

        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-white/40">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">

            <h2 className="text-3xl font-bold text-white">
              {title}
            </h2>

            <p className="text-green-100 mt-1 text-sm">
              Create and save new records easily
            </p>

          </div>

          {/* BODY */}

          <div className="p-8 space-y-6">

            {/* ERROR */}

            {error && (

              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl shadow-sm">

                <div className="font-semibold">
                  Error
                </div>

                <div className="text-sm mt-1">
                  {error}
                </div>

              </div>
            )}

            {/* SUCCESS */}

            {success && (

              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl shadow-sm">

                <div className="font-semibold">
                  Success
                </div>

                <div className="text-sm mt-1">
                  {success}
                </div>

              </div>
            )}

            {/* FORM */}

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">

              <FormRenderer
                fields={fields}
                form={form}
                setForm={setForm}
                options={options}
              />

            </div>

            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">

              <button
                onClick={submit}
                disabled={loading}
                className={`flex-1 py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg ${
                  loading
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:scale-[1.02] hover:shadow-xl"
                }`}
              >

                {loading ? (

                  <div className="flex items-center justify-center gap-2">

                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                    Saving...

                  </div>

                ) : (

                  "Save"

                )}

              </button>

              <button
                onClick={onCancel}
                disabled={loading}
                className="flex-1 py-3 rounded-2xl font-semibold bg-gray-200 hover:bg-gray-300 transition-all duration-300 text-gray-700"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddPage;