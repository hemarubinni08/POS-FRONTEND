import { useNavigate } from "react-router-dom";

function Sidebar({ nodes = [], user }) {

  const navigate = useNavigate();

  const getNodePath = (path = "") => {
    if (path.startsWith("/")) {
      return path;
    }

    return `/dashboard/${path}`;
  };

  return (
    <div
      style={{
        width: "260px",
        background: "#1f2937",
        color: "#fff",
        padding: "20px",
        overflowY: "auto"
      }}
    >

      {/* USER INFO */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          paddingBottom: "20px",
          borderBottom: "1px solid #374151"
        }}
      >

        <div
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4b6cb7, #182848)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 15px auto",
            fontSize: "30px",
            fontWeight: "bold"
          }}
        >
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <h3>{user?.name || "User"}</h3>
        <small>{user?.username}</small>

      </div>

      <h4>Navigation</h4>

      {nodes.length === 0 ? (
        <p>No menu available</p>
      ) : (
        nodes.map((node) => (
          <div key={node.id} style={{ marginBottom: "10px" }}>
            <div
              onClick={() => navigate(getNodePath(node.path))}
              style={{
                cursor: "pointer",
                padding: "12px",
                background: "#374151",
                borderRadius: "8px"
              }}
            >
              {node.identifier}
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Sidebar;
