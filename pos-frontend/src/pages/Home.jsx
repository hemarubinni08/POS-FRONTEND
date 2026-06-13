import React from "react";
import Layout from "../components/layout/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="dashboard" style={{ flex: 1 }}>
        <h3>Welcome to POS Dashboard 👋</h3>

        <div className="cards">
          <div className="card-box">
            <h5>Products</h5>
            <p>Manage inventory</p>
          </div>

          <div className="card-box">
            <h5>Customers</h5>
            <p>View & manage</p>
          </div>

          <div className="card-box">
            <h5>Sales</h5>
            <p>Track transactions</p>
          </div>

          <div className="card-box">
            <h5>Reports</h5>
            <p>Analytics & insights</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};


export default Home;
