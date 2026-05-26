import React, { useEffect } from "react";
import { useState } from "react";

function HardcodedDropdown(value, label, onChange, items = [] ){
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const data = items.json();
        setOptions(data);
        fetchOptions();
    }, []);

return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-600'>{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className='border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition'
            >
                <option value=''>Select {label}</option>
                {options.map((item) => (
                    <option key={item.identifier} value={item.identifier}>
                        {item.identifier}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default HardcodedDropdown;