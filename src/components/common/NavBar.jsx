import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">

      <h1 className="font-bold text-lg text-gray-700">
        POS Dashboard
      </h1>

      <div className="flex items-center gap-3">

        {/* PROFILE BUTTON */}
        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
        >
          Profile
        </button>

        {/* LOGOUT BUTTON */}
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;