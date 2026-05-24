import { useState, useEffect } from "react";
import axios from "axios";

const Categories = ({ formData, handleChange }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
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
            const response = await axios.get(
                `http://localhost:8080/api/category/listSuperCategory`,
                { headers }
            );

            setCategories(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-gray-700">
                Category
            </label>

            <select
                name="category"
                multiple
                value={formData.category}
                onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions).map(
                        (opt) => opt.value
                    );

                    handleChange({
                        target: {
                            name: "category",
                            value: selected,
                        },
                    });
                }}
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

                {categories.map((category) => (
                    <option
                        key={category.identifier}
                        value={category.name}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Categories;