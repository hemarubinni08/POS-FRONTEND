import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./Api";
import SingleDropdown from "./dropdowns/SingleDropdown";
import MultiDropdown from "./dropdowns/MultiDropdown";

const Add = ({ urlName, fields }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  // ✅ INIT FORM (VERY IMPORTANT FIX)
  useEffect(() => {
    const initial = {};

    fields.forEach((field) => {
      if (field.type === "multiDropdown") {
        initial[field.name] = [];
      } else {
        initial[field.name] = "";
      }
    });

    setFormData(initial);
  }, [fields]);

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("✅ Submitting:", formData); // debug

    api
      .post(`/${urlName}/add`, formData)
      .then(() => {
        setMessage("✅ Added successfully");

        setTimeout(() => {
          navigate(`/${urlName}/list`);
        }, 1000);
      })
      .catch((err) => {
        console.error("ADD ERROR:", err.response || err);
        setMessage("❌ Add failed");
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

        <h2 className="text-xl font-bold text-center mb-4">
          Add {urlName}
        </h2>

        {message && (
          <p
            className={`text-center text-sm mb-3 ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-medium">
                {field.label}
              </label>

              {/* ✅ TEXT / INPUT */}
              {(field.type === "text" ||
                field.type === "email" ||
                field.type === "password") && (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.label}
                  className="w-full p-3 border rounded"
                  required
                />
              )}

              {/* ✅ SINGLE DROPDOWN */}
              {field.type === "singleDropdown" && (
                <SingleDropdown
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  apiUrl={field.api}
                  placeholder={`-- Select ${field.label} --`}
                />
              )}

              {/* ✅ MULTI DROPDOWN */}
              {field.type === "multiDropdown" && (
                <MultiDropdown
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  apiUrl={field.api}
                />
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Add
          </button>

        </form>
      </div>
    </div>
  );
};

export default Add;