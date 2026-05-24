import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPage = ({
    modelName,
    fields,
    initialData,
    children,
    }) => {

    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const headers = {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            console.log(formData);

            await axios.post(
                `http://localhost:8080/api/${modelName}/add`,
                formData,
                { headers }
            );

            alert(`${modelName} added successfully`);

            setFormData(initialData);
            navigate(`/${modelName}/list`);

        } catch (error) {
            console.error(error);

            setMessage(`Failed to add ${modelName}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
                    Add {modelName}
                </h1>

                <p className="text-gray-500 mb-8">
                    Fill in the details below
                </p>

                {message && (
                    <div className="mb-4 text-sm text-blue-600">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {fields.map((field) => (
                        <div key={field.name}>
                            
                            <label className="block mb-2 text-sm font-semibold text-gray-700">
                                {field.label}
                            </label>

                            {field.type === "textarea" ? (
                                <textarea
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}

                        </div>
                    ))}

                    {/* Dropdowns / extra fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {React.Children.map(children, (child) =>
                            React.cloneElement(child, {
                                formData,
                                handleChange,
                            })
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >
                        {loading ? "Saving..." : "Submit"}
                    </button>
                </form>
                <button onClick={() => navigate("/" + modelName + "/list")}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-xl font-semibold mt-2"
                >
                    Back
                </button>
            </div>

        </div>
    );
};

export default AddPage;