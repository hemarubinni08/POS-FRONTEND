import { useState, useEffect } from "react";
import axios from "axios";

const Models = ({ formData, handleChange }) => {
    const [models, setModels] = useState([]);

    const fetchModels = async () => {
        const token = localStorage.getItem("token");

        const paginationDto = {
            page: 0,
            sizePerPage: 50,
        };

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

        try {
            const response = await axios.post(
                `http://localhost:8080/api/model/list`,
                paginationDto,
                { headers }
            );

            setModels(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchModels();
    }, []);

    return (
        <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
                Model
            </label>

            <select
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            >
                <option value="">Select Model</option>

                {models.map((model) => (
                    <option
                        key={model.identifier}
                        value={model.identifier}
                    >
                        {model.identifier}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Models;