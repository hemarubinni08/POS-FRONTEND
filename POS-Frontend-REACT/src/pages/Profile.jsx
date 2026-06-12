import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const name = localStorage.getItem("name") || "User";
  const username = localStorage.getItem("username") || "N/A";
  const phone = localStorage.getItem("phone") || "N/A";

  let roles = [];
  try {
    roles = JSON.parse(localStorage.getItem("roles")) || [];
  } catch (e) {}

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!token) return null;

  return (
    <>
      {/* ✅ INTERNAL CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f1f5f9;
        }

        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .card {
          width: 100%;
          max-width: 420px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .header {
          height: 150px;
          background: linear-gradient(135deg, #0B3C5D, #1e40af);
          position: relative;
          display: flex;
          align-items: flex-end;
          padding: 20px;
          color: white;
        }

        .avatar {
          width: 60px;
          height: 60px;
          background: white;
          color: #0B3C5D;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 22px;
          border-radius: 12px;
        }

        .user-info {
          margin-left: 12px;
        }

        .badge {
          font-size: 10px;
          background: #22c55e22;
          padding: 3px 8px;
          border-radius: 10px;
          border: 1px solid #22c55e55;
          margin-top: 4px;
          display: inline-block;
        }

        .body {
          padding: 20px;
        }

        .field {
          margin-bottom: 18px;
        }

        .label {
          font-size: 12px;
          color: gray;
          margin-bottom: 4px;
        }

        .value {
          font-weight: 600;
        }

        .roles {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .role-pill {
          padding: 5px 10px;
          font-size: 10px;
          border-radius: 10px;
          background: #e2e8f0;
        }

        .btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 10px;
          font-weight: bold;
        }

        .btn-primary {
          background: #0B3C5D;
          color: white;
        }

        .btn-danger {
          background: #fee2e2;
          color: red;
        }
      `}</style>

      {/* ✅ UI */}
      <div className="container">
        <div className="card">

          {/* HEADER */}
          <div className="header">
            <div className="avatar">
              {name.charAt(0)}
            </div>

            <div className="user-info">
              <h3>{name}</h3>
              <span className="badge">Active Session</span>
            </div>
          </div>

          {/* BODY */}
          <div className="body">

            <div className="field">
              <div className="label">Email</div>
              <div className="value">{username}</div>
            </div>

            <div className="field">
              <div className="label">Phone</div>
              <div className="value">{phone}</div>
            </div>

            <div className="field">
              <div className="label">Roles</div>
              <div className="roles">
                {roles.map((role, i) => (
                  <span key={i} className="role-pill">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* ACTIONS */}

            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Product List
            </button>
            <button
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
