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

  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  /* UPDATE FORM WHEN DATA CHANGES */

  useEffect(() => {

    setForm(initialForm);

  }, [initialForm]);

  /* SUBMIT */

  const handleSubmit = async () => {

    setError("");
    setSuccess("");

    if (validate) {

      const validationError = validate(form);

      if (validationError) {

        setError(validationError);
        return;
      }
    }

    setLoading(true);

    try {

      const res = await api.post(
        `/${modelName}/update`,
        form
      );

      if (res.data?.success === false) {

        setError(
          res.data.message || "Update failed"
        );

        return;
      }

      setSuccess("Updated successfully");

      setTimeout(() => {

        if (onSuccess) {

          onSuccess();
        }

      }, 700);

    } catch (e) {

      setError("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  if (!form) {

    return (

      <div className="flex justify-center items-center h-[60vh]">

        <div className="animate-spin rounded-full h-14 w-14 border-4 border-blue-500 border-t-transparent"></div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">

      <div className="max-w-4xl mx-auto">

        {/* CARD */}

        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border border-white/40">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">

            <h2 className="text-3xl font-bold text-white">
              {title}
            </h2>

            <p className="text-blue-100 mt-1 text-sm">
              Update and manage your details
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

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">

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
                onClick={handleSubmit}
                disabled={loading}
                className={`flex-1 py-3 rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] hover:shadow-xl"
                }`}
              >

                {loading ? (

                  <div className="flex items-center justify-center gap-2">

                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                    Updating...

                  </div>

                ) : (

                  "Update"

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

export default EditPage;