import React from "react";
import Layout from "../components/layout/Layout";
const Home = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow">
        <Layout>
            <h1>Home Page</h1>
        </Layout>
      <h1 className="text-3xl font-bold mb-3">
        Welcome 👋
      </h1>

      <p className="text-gray-600">
        This is your dashboard home page.
      </p>

    </div>
  );
};

export default Home;