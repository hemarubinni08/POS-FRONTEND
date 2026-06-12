import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "./Api";
import SingleDropdown from "./dropdowns/SingleDropdown";
import MultiDropdown from "./dropdowns/MultiDropdown";

const Edit = ({ urlName, fields }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const value1 = searchParams.get("identifier");

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!value1) {
      setMessage("❌ Invalid identifier");
      return;
    }

    const initial = {};
    fields.forEach((field) => {
      initial[field.name] =
        field.type === "multiDropdown" ? [] : "";
    });

    api
      .get(`/${urlName}/get`, {
        params: { identifier: value1 },
      })
      .then((res) => {
        setFormData({
          ...initial,
          ...res.data,
        });
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err.response || err);
        setMessage("❌ Failed to load data");
      });
  }, [value1, urlName, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const field = fields.find((f) => f.name === name);
    if (field?.readOnly) return; 

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      identifier: value1, 
    };

    console.log("PAYLOAD:", payload); // ✅ debugging

    api
      .post(`/${urlName}/update`, payload)
      .then(() => {
        setMessage("✅ Updated successfully");

        setTimeout(() => {
          navigate(`/${urlName}/list`);
        }, 1000);
      })
      .catch((err) => {
        console.error("UPDATE ERROR:", err.response || err);
        setMessage(
          "❌ " +
            (err.response?.data?.message || "Update failed")
        );
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(`/${urlName}/list`)}
          className="mb-4 text-gray-500 text-sm"
        >
          ← Back to List
        </button>

        {/* TITLE */}
        <h2 className="text-xl font-bold text-center mb-4">
          Edit {urlName}
        </h2>

        {/* MESSAGE */}
        {message && (
          <p
            className={`text-center text-sm mb-3 ${
              message.includes("✅")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium">
                {field.label}
              </label>

              {/* TEXT INPUT */}
              {(field.type === "text" ||
                field.type === "email" ||
                field.type === "password") && (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  readOnly={field.readOnly}
                  disabled={field.readOnly} // ✅ optional stronger lock
                  className={`w-full p-3 border rounded ${
                    field.readOnly
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
              )}

              {/* SINGLE DROPDOWN */}
              {field.type === "singleDropdown" && (
                <SingleDropdown
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  apiUrl={field.api}
                  placeholder={`-- Select ${field.label} --`}
                />
              )}

              {/* MULTI DROPDOWN */}
              {field.type === "multiDropdown" && (
                <MultiDropdown
                  name={field.name}
                  value={formData[field.name] || []}
                  onChange={handleChange}
                  apiUrl={field.api}
                />
              )}
            </div>
          ))}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;