import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import {
  fetchActiveRoles,
  getCurrentUser,
  updateUser
} from "../services/api";

function EditProfile() {

  const navigate = useNavigate();

  const { setUser } = useOutletContext();

  const [id, setId] = useState(null);

  const [name, setName] = useState("");

  const [username, setUsername] = useState("");

  const [phoneNo, setPhoneNo] = useState("");

  const [roles, setRoles] = useState([]);

  const [selectedRoles, setSelectedRoles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {

    loadUser();

    loadRoles();

  }, []);

  const loadUser = async () => {

    try {

      const data = await getCurrentUser();

      setId(data.id);

      setName(data.name);

      setUsername(data.username);

      setPhoneNo(data.phoneNo);

      setSelectedRoles(data.roles);

    } catch (error) {

      console.error(error);

    }

  };

  const loadRoles = async () => {

    try {

      const data = await fetchActiveRoles();

      setRoles(data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleRoleChange = (roleIdentifier) => {

    if (selectedRoles.includes(roleIdentifier)) {

      setSelectedRoles(

        selectedRoles.filter(
          (role) => role !== roleIdentifier
        )

      );

    } else {

      setSelectedRoles([
        ...selectedRoles,
        roleIdentifier
      ]);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      setSuccessMessage("");

      const updatedUser = {
        id,
        name,
        username,
        phoneNo,
        roles: selectedRoles

      };

      const data = await updateUser(updatedUser);

        setUser(data);

        setSuccessMessage(
          "Profile Updated Successfully"
        );

        setTimeout(() => {

          navigate("/profile");

        }, 800);

    } catch (error) {

      console.error(error);

      setError("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-4xl mx-auto">

      <div className="bg-white rounded-[28px] border border-[#e4e7ec] shadow-sm overflow-hidden">

        {/* HEADER */}

        <div className="px-10 py-8 border-b border-[#edf1f7]">

          <h1 className="text-3xl font-semibold text-[#111827]">

            Edit Profile

          </h1>

          <p className="text-[#667085] mt-2">

            Update your account information

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
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

          {/* NAME */}

          <div>

            <label className="block text-sm font-medium text-[#344054] mb-3">

              Full Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full h-14 px-5 rounded-2xl border border-[#d0d5dd] bg-white text-[#101828] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-medium text-[#344054] mb-3">

              Email Address

            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full h-14 px-5 rounded-2xl border border-[#d0d5dd] bg-white text-[#101828] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />

          </div>

          {/* PHONE */}

          <div>

            <label className="block text-sm font-medium text-[#344054] mb-3">

              Phone Number

            </label>

            <input
              type="text"
              value={phoneNo}
              onChange={(e) =>
                setPhoneNo(e.target.value)
              }
              className="w-full h-14 px-5 rounded-2xl border border-[#d0d5dd] bg-white text-[#101828] outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />

          </div>

          {/* ROLES */}

          <div>

            <p className="text-sm font-medium text-[#344054] mb-4">

              Roles

            </p>

            <div className="grid grid-cols-2 gap-4">

              {

                roles.map((role, index) => (

                  <label
                    key={index}
                    className="flex items-center gap-3 border border-[#e4e7ec] rounded-2xl px-5 py-4 hover:border-blue-500 transition-all cursor-pointer"
                  >

                    <input
                      type="checkbox"
                      checked={
                        selectedRoles.includes(
                          role.identifier
                        )
                      }
                      onChange={() =>
                        handleRoleChange(
                          role.identifier
                        )
                      }
                      className="h-4 w-4 accent-blue-600"
                    />

                    <span className="text-[#111827]">

                      {role.identifier}

                    </span>

                  </label>

                ))

              }

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={() => navigate("/profile")}
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
                  : "Save Changes"

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditProfile;