import { useOutletContext } from "react-router-dom";

function Dashboard() {

  const { user } = useOutletContext();

  return (

    <div className="space-y-8">

      {/* HERO */}

      <div>

        <h1 className="text-5xl font-bold tracking-tight text-gray-900">

          Welcome back, {user?.name}

        </h1>

      </div>

     
      </div>

  );

}

export default Dashboard;