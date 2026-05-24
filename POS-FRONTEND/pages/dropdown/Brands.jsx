import { useState, useEffect } from "react";
import axios from "axios";

const Brands = ({ formData = {}, handleChange }) => {
    const [brands, setBrands] = useState([]);

    const fetchBrands = async () => {
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
                `http://localhost:8080/api/brand/list`,
                paginationDto,
                { headers }
            );

            setBrands(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    useEffect(() => {
        console.log("FORM brandName:", formData.brandName);
        console.log("BRANDS:", brands);
    }, [formData, brands]);

    return (
        <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
                Brand
            </label>

            <select
                name="brandName"
                value={formData.brandName || ""}
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
                <option value="">Select Brand</option>

                {brands.map((brand) => (
                    <option
                        key={brand.identifier}
                        value={brand.identifier}
                    >
                        {brand.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Brands;