import { useNavigate } from "react-router-dom";

const Sidebar = ({ nodes }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-[240px] h-screen bg-gray-900 flex flex-col">

      <h1
        onClick={() => navigate("/dashboard")}
        className="text-white text-2xl font-bold text-center py-6 cursor-pointer"
      >
        Dashboard
      </h1>

      <div className="flex-1 overflow-y-auto px-3">

        <div
          onClick={() => navigate("/dashboard")}
          className="text-gray-200 hover:bg-white/10 p-3 rounded cursor-pointer mb-2"
        >
          Home
        </div>

        {Array.isArray(nodes) &&
          nodes.map((node) => (
            <div
              key={node.identifier}
              onClick={() => navigate(node.path)}
              className="text-gray-200 hover:bg-white/10 p-3 rounded cursor-pointer mb-2"
            >
              {node.identifier}
            </div>
          ))}
      </div>

    </div>
  );
};

export default Sidebar;