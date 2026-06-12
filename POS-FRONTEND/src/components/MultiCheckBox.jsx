import { useEffect, useState } from "react";

import { listItems, fetchActiveRoles } from "../services/api";

function MultiCheckBox({

  label,

  model,

  values,

  onChange,

  required = false

}) {

  const [options, setOptions] =
    useState([]);

  const [touched, setTouched] =
    useState(false);

    useEffect(() => {

    loadOptions();

  }, []);

  const loadOptions = async () => {

    try {

      let response;

        if (model === "role") {

          response =
            await fetchActiveRoles();

        } else {

          response =
            await listItems(model);

        }

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

  const handleCheckboxChange = (
    optionValue
  ) => {

    setTouched(true);

    if (
      values.includes(optionValue)
    ) {

      onChange(

        values.filter(
          (item) =>
            item !== optionValue
        )

      );

    } else {

      onChange([
        ...values,
        optionValue
      ]);

    }

  };

  const hasError =

    required &&
    touched &&
    values.length === 0;

  return (

    <div>

      <label className="block text-sm font-medium text-[#344054] mb-4">

        {label}

      </label>

      <div className={`space-y-3 border rounded-2xl p-5 bg-white

        ${hasError

          ? "border-red-500"

          : "border-[#d0d5dd]"
        }

      `}>

        {

          options.map((item) => (

            <label
              key={item.id}
              className="flex items-center gap-3 cursor-pointer"
            >

              <input
                type="checkbox"

                checked={
                  values.includes(
                    item.identifier
                  )
                }

                onChange={() =>
                  handleCheckboxChange(
                    item.identifier
                  )
                }

                className="h-5 w-5 rounded border-gray-300"
              />

              <span className="text-[#101828]">

                {item.identifier}

              </span>

            </label>

          ))

        }

      </div>

      {

        hasError && (

          <p className="text-sm text-red-500 mt-2">

            At least one option must be selected

          </p>

        )

      }

    </div>

  );

}

export default MultiCheckBox;