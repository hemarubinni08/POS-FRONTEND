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

import UserList from "../pages/user/UserList";
import UserEdit from "../pages/user/UserEdit";

import WarehouseList from "../pages/warehouse/WarehouseList";
import WarehouseAdd from "../pages/warehouse/WarehouseAdd";
import WarehouseEdit from "../pages/warehouse/WarehouseEdit";

import CategoryList from "../pages/category/CategoryList";
import CategoryAdd from "../pages/category/CategoryAdd";
import CategoryEdit from "../pages/category/CategoryEdit";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          {/* PRODUCT */}
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/product/edit/:identifier" element={<ProductEdit />} />
          <Route path="/product/list" element={<Navigate to="/product" replace />} />

          {/* USER */}
          <Route path="/user" element={<UserList />} />
          <Route path="/user/edit/:username" element={<UserEdit />} />
          <Route path="/user/list" element={<Navigate to="/user" replace />} />

          {/* WAREHOUSE */}
          <Route path="/warehouse" element={<WarehouseList />} />
          <Route path="/warehouse/add" element={<WarehouseAdd />} />
          <Route path="/warehouse/edit/:identifier" element={<WarehouseEdit />} />
          <Route path="/warehouse/list" element={<Navigate to="/warehouse" replace />} />

          {/* CATEGORY */}
          <Route path="/category" element={<CategoryList/>} />
          <Route path="/category/list" element={<Navigate to="/category" replace />} />
          <Route path="/category/add" element={<CategoryAdd/>} />
          <Route path="/category/edit/:identifier" element={<CategoryEdit />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;