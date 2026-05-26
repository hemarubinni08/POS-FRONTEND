import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (

    <div className="fixed top-0 left-[240px] right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-40">

      <h1
        onClick={() => navigate("/dashboard")}
        className="font-bold text-lg text-gray-700 cursor-pointer hover:text-blue-600 transition"
      >
        POS Dashboard
      </h1>

      <div className="flex items-center gap-4">

        <button
          onClick={() => navigate("/profile")}
          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition"
        >
          {username}
        </button>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>

  );
};

export default Navbar;