import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchActiveRoles, registerUser } from "../services/api";

function Register() {

  const [name, setName] = useState("");

  const [username, setUsername] = useState("");

  const [phoneNo, setPhoneNo] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [roles, setRoles] = useState([]);

  const [selectedRoles, setSelectedRoles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();


useEffect(() => {

  loadRoles();

}, []);

const loadRoles = async () => {

  try {

    const data = await fetchActiveRoles();

    console.log(data);

    setRoles(data || []);

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

    setSelectedRoles(
      [...selectedRoles, roleIdentifier]
    );

  }

};

const handleLoginNavigation = () => {

  navigate("/login");

};

const handleSubmit = async (e) => {

  e.preventDefault();

  if (
    name.trim() === "" ||
    username.trim() === "" ||
    phoneNo.trim() === "" ||
    password.trim() === "" ||
    confirmPassword.trim() === ""
  ) {

    setError("All fields are required");

    return;

  }

  const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(username)) {

  setError("Enter a valid email address");

  return;

}

if (phoneNo.length !== 10) {

  setError("Phone number must be 10 digits");

  return;

}

  if (password !== confirmPassword) {

    setError("Passwords do not match");

    return;

  }

  if (selectedRoles.length === 0) {

    setError("Select at least one role");

    return;

  }

  try {

    setError("");

    setSuccessMessage("");

    setLoading(true);

    const userData = {

      name: name,

      username: username,

      phoneNo: phoneNo,

      password: password,

      roles: selectedRoles

    };

    console.log(userData);

    const data = await registerUser(userData);

    console.log(data);

    setLoading(false);

    if (data.success === false) {

      setError(data.message);

      return;

    }

    setSuccessMessage(
      "Registration Successful"
    );

    setTimeout(() => {

      navigate("/login");

    }, 2000);

  } catch (error) {

    console.log(error);

    setLoading(false);

    setError("Something went wrong");

  }

};

return (

  <div className="min-h-screen flex bg-[#111111]">

    {/* LEFT SECTION */}

    <div className="hidden lg:flex w-1/2 bg-[#111111] text-white flex-col justify-between px-20 py-14">

      <div>

        {/* Logo */}

        <div className="flex items-center gap-4 mb-20">

          <div className="w-14 h-14 border-2 border-white rounded-xl flex items-center justify-center">

            <span className="text-2xl font-semibold">
              P
            </span>

          </div>

          <div>

            <h1 className="text-3xl font-semibold">
              YOUR POS
            </h1>

            <p className="text-gray-400 text-sm">
              Retail Management System
            </p>

          </div>

        </div>

        {/* Main Content */}

        <div className="max-w-xl">

          <h1 className="text-7xl font-bold leading-tight tracking-tight">

            Build your retail business smarter.

          </h1>

          <p className="mt-10 text-2xl text-gray-300 leading-relaxed">

            Create your account and start managing products,
            billing, inventory, customers, and sales seamlessly.

          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-gray-800 pt-10">

        <h2 className="text-4xl font-bold mb-6">

          Need assistance?

        </h2>

        <div className="flex gap-10 text-xl text-gray-300">

          <p>
            +91 9876543210
          </p>

          <p>
            support@yourpos.com
          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SECTION */}

    <div className="w-full lg:w-1/2 bg-[#f5f5f5] flex items-center justify-center px-6 py-10 overflow-y-auto">

      <div className="w-full max-w-xl bg-white rounded-2xl p-14 shadow-sm">

        {/* Heading */}

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-black">

            Create Account

          </h1>

          <p className="text-gray-600 mt-4 text-xl">

            Start using your POS system today

          </p>

        </div>

        {/* Error */}

        {

          error && (

            <div className="mb-6 border border-red-200 bg-red-50 text-red-600 px-5 py-4 rounded-xl text-base">

              {error}

            </div>

          )

        }

        {/* Success */}

        {

          successMessage && (

            <div className="mb-6 border border-green-200 bg-green-50 text-green-600 px-5 py-4 rounded-xl text-base">

              {successMessage}

            </div>

          )

        }

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}

          <div>

            <label className="block text-lg font-medium text-gray-700 mb-3">

              Full Name

            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your full name"
              className="w-full border border-gray-300 bg-white rounded-xl px-5 py-5 text-lg outline-none focus:border-blue-600 transition-all"
            />

          </div>

          {/* Email */}

          <div>

            <label className="block text-lg font-medium text-gray-700 mb-3">

              Email Address

            </label>

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full border border-gray-300 bg-white rounded-xl px-5 py-5 text-lg outline-none focus:border-blue-600 transition-all"
            />

          </div>

          {/* Phone */}

          <div>

            <label className="block text-lg font-medium text-gray-700 mb-3">

              Phone Number

            </label>

            <input
              type="text"
              value={phoneNo}
              onChange={(e) => {

                const value = e.target.value;

                if (/^\d*$/.test(value) && value.length <= 10) {

                  setPhoneNo(value);

                }

              }}
              placeholder="Enter phone number"
              className="w-full border border-gray-300 bg-white rounded-xl px-5 py-5 text-lg outline-none focus:border-blue-600 transition-all"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block text-lg font-medium text-gray-700 mb-3">

              Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter password"
              className="w-full border border-gray-300 bg-white rounded-xl px-5 py-5 text-lg outline-none focus:border-blue-600 transition-all"
            />

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block text-lg font-medium text-gray-700 mb-3">

              Confirm Password

            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm password"
              className="w-full border border-gray-300 bg-white rounded-xl px-5 py-5 text-lg outline-none focus:border-blue-600 transition-all"
            />

          </div>

          {/* Roles */}

          <div>

            <p className="text-lg font-medium text-gray-700 mb-4">

              Select Roles

            </p>

            <div className="grid grid-cols-2 gap-4">

              {

                roles.map((role, index) => (

                  <label
                    key={index}
                    className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-4 cursor-pointer hover:border-blue-600 transition-all bg-white"
                  >

                    <input
                      type="checkbox"
                      value={role.identifier}
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
                      className="h-5 w-5 accent-blue-600"
                    />

                    <span className="text-gray-700 text-lg">

                      {role.identifier}

                    </span>

                  </label>

                ))

              }

            </div>

          </div>

          {/* Buttons */}

          <div className="space-y-4 pt-4">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0f62fe] hover:bg-[#004de6] text-white text-xl font-semibold py-5 rounded-xl transition-all"
            >

              {

                loading
                  ? "Creating Account..."
                  : "Create Account"

              }

            </button>

            <div className="text-center">

              <p className="text-gray-600 text-lg">

                Already have an account?

              </p>

              <button
                type="button"
                onClick={handleLoginNavigation}
                className="mt-3 text-[#0f62fe] hover:underline text-lg font-semibold"
              >

                Sign In

              </button>

            </div>

          </div>

        </form>

      </div>

    </div>

  </div>

);

}

export default Register;