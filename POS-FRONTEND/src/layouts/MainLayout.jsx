import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { removeToken } from "../utils/auth";
import { getCurrentUser } from "../services/api";
import { useEffect, useState } from "react";
import { getNodesForRoles } from "../services/api";

function MainLayout() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [nodes, setNodes] = useState([]);

  const handleLogout = () => {

    removeToken();

    navigate("/login");

  };

  const fetchUser = async () => {

    try {

      const data = await getCurrentUser();

      setUser(data);

    } catch (error) {

      console.error(error);

    }

  };

  const fetchNodes = async () => {

  try {

    const data = await getNodesForRoles();

    const activeNodes = data.filter(
      (node) => node.status
    );

    setNodes(activeNodes);

  } catch (error) {

    console.error(error);

  }

};

  useEffect(() => {

    fetchUser();
    fetchNodes();

  }, []);

  return (

    <div className="flex h-screen bg-[#111111] text-white overflow-hidden">

      {/* SIDEBAR */}

      <div className="w-70 bg-black border-r border-white/10 flex flex-col justify-between">

        <div>

          {/* Logo */}

          <div className="px-8 py-10 border-b border-white/10">

            <h1 className="text-4xl font-bold tracking-tight">

              POS

            </h1>

            <p className="text-gray-500 mt-2 text-sm">

              Retail Management System

            </p>

          </div>

          {/* Navigation */}

          <div className="p-4 space-y-2">

            <NavLink
              to="/dashboard"

              className={({ isActive }) =>

                `w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all border

                ${

                  isActive

                    ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/20"

                    : "text-gray-300 border-transparent hover:bg-white/5 hover:border-white/10"

                }`

              }
            >

              Dashboard

            </NavLink>

            {

              nodes.map((node, index) => (

                <NavLink
                  key={index}

                  to={node.path}

                  className={({ isActive }) =>

                    `w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-medium transition-all border

                    ${

                      isActive

                        ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/20"

                        : "text-gray-300 border-transparent hover:bg-white/5 hover:border-white/10"

                    }`

                  }
                >

                  {node.identifier}

                </NavLink>

              ))

            }

          </div>

        </div>

        {/* Logout */}

        <div className="p-4 border-t border-white/10">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-2xl font-medium transition-all"
          >

            Logout

          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}

        <div className="h-24 bg-black border-b border-white/10 flex items-center justify-between px-10">

          {/* Left */}

          <div>

            <h1 className="text-2xl font-semibold">

              Your POS System

            </h1>

          </div>

          {/* Right */}

          <div className="relative">

            <button
              onClick={() =>
                setShowProfileMenu(!showProfileMenu)
              }
              className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold hover:bg-blue-500 transition-all"
            >

              {user?.name?.charAt(0)?.toUpperCase()}

            </button>

            {/* Profile Dropdown */}

            {

              showProfileMenu && (

                <div className="absolute right-0 top-16 w-72 bg-[#1b1b1b] border border-white/10 rounded-2xl shadow-2xl p-5 z-50">

                  <div className="flex items-center gap-4 mb-5">

                    <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">

                      {user?.name?.charAt(0).toUpperCase()}

                    </div>

                    <div>

                      <p className="font-semibold">

                        {user?.name}

                      </p>

                      <p className="text-sm text-gray-400">

                        {user?.username}

                      </p>

                    </div>

                  </div>

                  <div className="space-y-2 text-sm text-gray-400">

                    <p>

                      Phone: {user?.phoneNo}

                    </p>

                    <p>

                      Roles: {user?.roles?.join(", ")}

                    </p>

                  </div>

                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full mt-5 bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-medium transition-all"
                  >

                    View Profile

                  </button>

                </div>

              )

            }

          </div>

        </div>

        {/* PAGE CONTENT */}

        <div className="flex-1 overflow-y-auto bg-[#f4f7fb] p-10">

          <Outlet context={{ user, setUser }} />

        </div>

      </div>

    </div>

  );

}

export default MainLayout;