import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRole,
  allowedRoles
}) => {

  const token = localStorage.getItem("token");

  const location = useLocation();

  const userRoles = JSON.parse(
    localStorage.getItem("userRoles") || "[]"
  );

  if (!token) {

    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  const allowed =
    allowedRoles ||
    (allowedRole ? [allowedRole] : []);

  const hasAccess =
    allowed.length === 0 ||
    allowed.some(role =>
      userRoles.includes(role)
    );

  if (!hasAccess) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-6">

        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-red-100">

          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Access Denied
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            You do not have permission to access this page.
          </p>

          <button
            onClick={() => window.history.back()}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:scale-[1.02] transition-all duration-300 text-white py-3 rounded-2xl font-semibold shadow-lg"
          >
            Go Back
          </button>

        </div>

      </div>
    );
  }

  return children;
};

export default ProtectedRoute;