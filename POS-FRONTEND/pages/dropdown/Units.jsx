import { useState, useEffect } from "react";
import axios from "axios";

const Units = ({ formData, handleChange }) => {
    const [units, setUnits] = useState([]);

    const fetchUnits = async () => {
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
                `http://localhost:8080/api/unit/list`,
                paginationDto,
                { headers }
            );

            setUnits(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    return (
        <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
                Unit
            </label>

            <select
                name="unit"
                value={formData.unit}
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
                <option value="">Select Unit</option>

                {units.map((unit) => (
                    <option
                        key={unit.identifier}
                        value={unit.identifier}
                    >
                        {unit.identifier}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Units;