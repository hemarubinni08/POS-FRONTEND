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

import NodeList from "../pages/node/NodeList";
import NodeAdd from "../pages/node/NodeAdd";
import NodeEdit from "../pages/node/NodeEdit";

import ShelfList from "../pages/shelf/ShelfList";
import ShelfAdd from "../pages/shelf/ShelfAdd";
import ShelfEdit from "../pages/shelf/ShelfEdit";

import UnitList from "../pages/unit/UnitList";
import UnitAdd from "../pages/unit/UnitAdd";
import UnitEdit from "../pages/unit/UnitEdit";

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

          {/* NODE */}
          <Route path="/node" element={<NodeList />} />
          <Route path="/node/list" element={<Navigate to="/node" replace />} />
          <Route path="/node/add" element={<NodeAdd />} />
          <Route path="/node/edit/:identifier" element={<NodeEdit />} />

          {/* SHELF */}
          <Route path="/shelf" element={<ShelfList />} />
          <Route path="/shelf/list" element={<Navigate to="/shelf" replace />} />
          <Route path="/shelf/add" element={<ShelfAdd />} />
          <Route path="/shelf/edit/:identifier" element={<ShelfEdit />} />

          {/* UNIT */}
          <Route path="/unit" element={<UnitList />} />
          <Route path="/unit/list" element={<Navigate to="/unit" replace />} />
          <Route path="/unit/add" element={<UnitAdd />} />
          <Route path="/unit/edit/:identifier" element={<UnitEdit />} />
      
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;