import { useEffect, useState } from "react";

import { listItems } from "../services/api";

function SingleDropDown({

  label,

  model,

  value,

  onChange,

  placeholder = "Select Option",

  required = false

}) {

  const [options, setOptions] =
    useState([]);

  useEffect(() => {

    loadOptions();

  }, []);

  const loadOptions = async () => {

    try {

      const response =
        await listItems(model);

      setOptions(
        response || []
      );

    } catch (err) {

      console.error(
        `Failed to load ${model}`,
        err
      );

    }

  };

  return (

    <div>

      <label className="block text-sm font-medium text-[#344054] mb-3">

        {label}

      </label>

      <select

        value={value}

        onChange={(e) =>
          onChange(e.target.value)
        }

        required={required}

        className="w-full px-5 py-4 rounded-2xl border border-[#d0d5dd] bg-white text-black outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"

      >

        <option value="">

          {placeholder}

        </option>

        {

          options.map((item) => (

            <option
              key={item.id}
              value={item.identifier}
            >

              {item.identifier}

            </option>

          ))

        }

      </select>

    </div>

  );

}

export default SingleDropDown;