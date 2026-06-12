import { useOutletContext } from "react-router-dom";

/* ===== CARD COMPONENT ===== */
const DashboardCard = ({ label, value }) => (
  <div className="bg-slate-50 border rounded-lg p-5 hover:shadow-md transition">
    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
      {label}
    </p>
    <p className="text-base font-semibold text-slate-800">
      {value}
    </p>
  </div>
);

const Home = () => {
  const { nodes, loading, name } = useOutletContext();

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8 max-w-4xl">

      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        Welcome back, {name}
      </h2>

      <p className="text-slate-500 text-sm mb-6">
        Use the sidebar to navigate system modules.
      </p>

      {/* ===== METRICS GRID ===== */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-all ${
          loading ? "opacity-60" : "opacity-100"
        }`}
      >

        <DashboardCard
          label="System Status"
          value="Online / Active"
        />

        <DashboardCard
          label="Available Modules"
          value={loading ? "Fetching..." : `${nodes.length} Modules`}
        />

        <DashboardCard
          label="Access Level"
          value="Authorized User"
        />

        <DashboardCard
          label="Last Login"
          value={new Date().toLocaleString()}
        />

      </div>
    </div>
  );
};

export default Home;