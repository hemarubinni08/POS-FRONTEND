import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProductList from "./pages/Product/ProductList";
import ProductAdd from "./pages/Product/ProductAdd";
import ProductEdit from "./pages/Product/ProductEdit";
import UserList from "./pages/User/UserList";
import UserAdd from "./pages/User/UserAdd";
import UserEdit from "./pages/User/UserEdit";

import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== PROTECTED ROUTES (WITH LAYOUT) ===== */}
        <Route path="/" element={<Layout />}>

          {/* Default redirect */}
          <Route index element={<Navigate to="/home" replace />} />

          {/* Main pages */}
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />

          {/* NEW PRODUCT ROUTE */}
          <Route path="/product/list" element={<ProductList />} />
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/product/edit/:identifier" element={<ProductEdit />} />

          {/* NEW USER ROUTE */}
          <Route path="/user/list" element={<UserList />} />
          <Route path="/user/add" element={<UserAdd />} />
          <Route path="/user/edit/:username" element={<UserEdit />} />

        </Route>

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;