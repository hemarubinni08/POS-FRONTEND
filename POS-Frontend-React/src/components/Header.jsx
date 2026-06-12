function Header({ user, logout, navigate }) {

  return (
    <div
      style={{
        background: "#111010",
        padding: "15px 25px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >

      {/* TITLE */}
      <div>
        <h2 style={{ margin: 0 }}>POS Dashboard</h2>
        <small>Welcome back, {user?.name}</small>
      </div>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "10px" }}>

        <button
          onClick={() => navigate("/profile")}
          style={{
            background: "#4b6cb7",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          View Profile
        </button>

        <button
          onClick={logout}
          style={{
            background: "#dc3545",
            color: "#fff",
            border: "none",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Header;
