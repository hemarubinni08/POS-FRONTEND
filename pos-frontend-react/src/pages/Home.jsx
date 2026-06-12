import React from "react";

export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Top welcome section */}
        <div style={styles.topSection}>
          <div style={styles.badge}>Point of Sale System</div>

          <h1 style={styles.title}>
            Welcome to <span style={styles.brand}>RetailPOS</span>
          </h1>

          <p style={styles.subtitle}>
            Fast. Simple. Smart retail management — built for modern businesses.
          </p>
        </div>

        {/* Three feature boxes */}
        <div style={styles.features}>
          <div style={styles.featureBox}>
            <p style={styles.featureTitle}>
              Inventory Control
            </p>

            <p style={styles.featureText}>
              Track stock in real time with zero complexity.
            </p>
          </div>

          <div
            style={{
              ...styles.featureBox,
              ...styles.featureBoxAccent,
            }}
          >
            <p
              style={{
                ...styles.featureTitle,
                color: "#fff",
              }}
            >
              Sales Insights
            </p>

            <p
              style={{
                ...styles.featureText,
                color: "rgba(232,232,232,0.75)",
              }}
            >
              Understand your business in one clear dashboard.
            </p>
          </div>

          <div style={styles.featureBox}>
            <p style={styles.featureTitle}>
              Fast Billing
            </p>

            <p style={styles.featureText}>
              Quick, accurate, and efficient POS workflow.
            </p>
          </div>
        </div>

        {/* Bottom strip */}
        <div style={styles.bottomStrip}>
          <span style={styles.bottomText}>
            RetailPOS · Built for modern retail teams · v2.0
          </span>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    position: "fixed",
    top: "60px",
    left: "220px",
    right: 0,
    bottom: 0,
    backgroundColor: "#F0F1F5",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    overflow: "hidden",
  },

  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    borderLeft: "1px solid #E8E8E8",
  },

  topSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 40px 24px",
    textAlign: "center",
    background:
      "linear-gradient(160deg, #F5F6E6 0%, #fff 60%)",
  },

  badge: {
    display: "inline-block",
    padding: "4px 14px",
    borderRadius: "20px",
    backgroundColor: "rgba(84,102,142,0.1)",
    color: "#54668E",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    marginBottom: "16px",
    border:
      "1px solid rgba(84,102,142,0.2)",
  },

  title: {
    fontSize: "34px",
    fontWeight: "700",
    color: "#363955",
    marginBottom: "12px",
    letterSpacing: "-0.5px",
  },

  brand: {
    color: "#54668E",
    borderBottom: "3px solid #879EC6",
    paddingBottom: "2px",
  },

  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    maxWidth: "440px",
    lineHeight: "1.6",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "0 40px 40px",
    flexWrap: "wrap",
  },

  featureBox: {
    backgroundColor: "#F5F6E6",
    border: "1px solid #E8E8E8",
    padding: "28px 24px",
    borderRadius: "10px",
    width: "210px",
    textAlign: "center",
    flexShrink: 0,
  },

  featureBoxAccent: {
    background:
      "linear-gradient(135deg, #363955, #54668E)",
    border: "1px solid #363955",
    boxShadow:
      "0 8px 24px rgba(54,57,85,0.25)",
    transform: "translateY(-4px)",
  },

  featureTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#363955",
    marginBottom: "8px",
  },

  featureText: {
    fontSize: "12px",
    color: "#6b7280",
    lineHeight: "1.5",
  },

  statsRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0",
    padding: "16px 40px",
    borderTop: "1px solid #E8E8E8",
    borderBottom: "1px solid #E8E8E8",
    backgroundColor: "#F5F6E6",
    flexShrink: 0,
  },

  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 40px",
  },

  statNum: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#363955",
  },

  statLabel: {
    fontSize: "11px",
    color: "#9ca3af",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginTop: "2px",
  },

  statDivider: {
    width: "1px",
    height: "36px",
    backgroundColor: "#E8E8E8",
  },

  bottomStrip: {
    background:
      "linear-gradient(135deg, #363955 0%, #54668E 100%)",
    padding: "13px 40px",
    textAlign: "center",
    flexShrink: 0,
  },

  bottomText: {
    color: "rgba(232,232,232,0.8)",
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "0.3px",
  },
};