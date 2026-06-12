import { useNavigate } from "react-router-dom";

function CommonAdd({

  title,

  subtitle,

  identifier,

  setIdentifier,

  description,

  setDescription,

  loading,

  error,

  successMessage,

  onSubmit,

  cancelPath,

  children

}) {

  const navigate = useNavigate();

  return (

    <div className="max-w-4xl mx-auto">

      <div className="bg-white rounded-[28px] border border-[#e4e7ec] shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="px-10 py-8 border-b border-[#edf1f7]">

          <h1 className="text-3xl font-semibold text-[#111827]">

            {title}

          </h1>

          <p className="text-[#667085] mt-2">

            {subtitle}

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={onSubmit}
          className="p-10 space-y-8"
        >

          {/* SUCCESS */}

          {

            successMessage && (

              <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">

                {successMessage}

              </div>

            )

          }

          {/* ERROR */}

          {

            error && (

              <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl">

                {error}

              </div>

            )

          }

          {/* IDENTIFIER */}

          <div>

            <label className="block text-sm font-medium text-[#344054] mb-3">

              Identifier

            </label>

            <input
              type="text"

              value={identifier}

              onChange={(e) =>
                setIdentifier(
                  e.target.value
                )
              }

              required

              minLength={2}

              maxLength={50}

              pattern=".*\S.*"

              title="Identifier cannot be empty"

              className="w-full h-14 px-5 rounded-2xl border border-[#d0d5dd] bg-white text-[#101828] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label className="block text-sm font-medium text-[#344054] mb-3">

              Description

            </label>

            <input
              type="text"

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

              required

              minLength={3}

              maxLength={100}

              pattern=".*\S.*"

              title="Description cannot be empty"

              className="w-full h-14 px-5 rounded-2xl border border-[#d0d5dd] bg-white text-[#101828] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />

          </div>

          {/* CUSTOM FIELDS */}

          {children}

          {/* BUTTONS */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"

              onClick={() =>
                navigate(cancelPath)
              }

              className="h-14 px-8 rounded-2xl border border-[#d0d5dd] text-[#344054] font-medium hover:bg-gray-50 transition-all"
            >

              Cancel

            </button>

            <button
              type="submit"

              disabled={loading}

              className="h-14 px-8 rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium transition-all shadow-lg shadow-blue-500/20"
            >

              {

                loading

                  ? "Saving..."

                  : "Create"

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default CommonAdd;