import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import DashboardLayout from "../layouts/DashboardLayout";

import ProductList from "../pages/product/ProductList";
import ProductAdd from "../pages/product/ProductAdd";
import ProductEdit from "../pages/product/ProductEdit";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/product" element={<ProductList />} />
          <Route path="/product/list" element={<Navigate to="/product" replace />} />
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/product/edit/:identifier" element={<ProductEdit />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;