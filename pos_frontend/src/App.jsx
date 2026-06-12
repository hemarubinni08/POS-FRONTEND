import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Register from "./Register.jsx";
import Login from "./login.jsx";
import Profile from "./Profile.jsx";
import Home from "./Home.jsx";

import ProductList from "./pages/product/ProductList.jsx";
import UserList from "./pages/user/UserList.jsx";
import NodeList from "./pages/node/NodeList.jsx";
import RackList from "./pages/rack/RackList.jsx";
import RoleList from "./pages/role/RoleList.jsx";
import CategoryList from "./pages/category/CategoryList.jsx";
//import CustomerList from "./pages/customer/CustomerList.jsx";
import ShelfList from "./pages/shelf/ShelfList.jsx";
import UnitList from "./pages/unit/UnitList.jsx";
import BrandList from "./pages/brand/BrandList.jsx";
import PriceList from "./pages/price/PriceList.jsx";
import ModelList from "./pages/model/ModelList.jsx";
import WarehouseList from "./pages/warehouse/warehouse.jsx";
import StockList from "./pages/stock/StockList.jsx";
import CartList from "./pages/cart/CartList.jsx";
import AddFormSkeleton from "./components/AddFormSkeleton.jsx";
import AddProduct from "./pages/product/AddProduct.jsx";
import CommonDropdown from "./components/CommonDropdown.jsx";
import AddNode from "./pages/node/AddNode.jsx";
import EditFormSkeleton from "./components/EditFormSkeleton.jsx";
import AddBrand from "./pages/brand/AddBrand.jsx";
import AddCategory from "./pages/category/AddCategory.jsx";
//import AddCustomer from "./pages/customer/AddCustomer.jsx";
import AddModel from "./pages/model/AddModel.jsx";
import AddPrice from "./pages/price/AddPrice.jsx";
import AddShelf from "./pages/shelf/AddShelf.jsx";
import AddUnit from "./pages/unit/AddUnit.jsx";
import AddRack from "./pages/rack/AddRack.jsx";
import AddRole from "./pages/role/AddRole.jsx";
import AddWarehouse from "./pages/warehouse/AddWarehouse.jsx";
import AddStock from "./pages/stock/AddStock.jsx";
import AddUser from "./pages/user/AddUser.jsx";
import EditProduct from "./pages/product/EditProduct.jsx";
import EditBrand from "./pages/brand/EditBrand.jsx";
import EditPrice from "./pages/price/EditPrice.jsx";
import EditUser from "./pages/user/EditUser.jsx";
//import EditCustomer from "./pages/customer/EditCustomer.jsx";
import EditRole from "./pages/role/EditRole.jsx";
import EditNode from "./pages/node/EditNode.jsx";
import EditCategory from "./pages/category/EditCategory.jsx";
const PrivateRoute = ({ element }) => {
  return localStorage.getItem("token") ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/home" />
              : <Navigate to="/login" />
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes ✅ */}
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />

        <Route path="/product" element={<PrivateRoute element={<ProductList />} />} />
        <Route path="/product/add" element={<PrivateRoute element={<AddProduct />} />} />
        <Route path="/product/edit/:identifier" element={<PrivateRoute element={<EditProduct />} />} />

        <Route path="/user/list" element={<PrivateRoute element={<UserList />} />} />
        <Route path="/node/list" element={<PrivateRoute element={<NodeList />} />} />
        <Route path="/rack/list" element={<PrivateRoute element={<RackList />} />} />
        <Route path="/role/list" element={<PrivateRoute element={<RoleList />} />} />
        <Route path="/category/list" element={<PrivateRoute element={<CategoryList />} />} />
        {/* <Route path="/customer/list" element={<PrivateRoute element={<CustomerList />} />} /> */}
        <Route path="/shelf/list" element={<PrivateRoute element={<ShelfList />} />} />
        <Route path="/unit/list" element={<PrivateRoute element={<UnitList />} />} />
        <Route path="/brand/list" element={<PrivateRoute element={<BrandList />} />} />
        <Route path="/price/list" element={<PrivateRoute element={<PriceList />} />} />
        <Route path="/model/list" element={<PrivateRoute element={<ModelList />} />} />
        <Route path="/warehouse/list" element={<PrivateRoute element={<WarehouseList />} />} />
        <Route path="/stock/list" element={<PrivateRoute element={<StockList />} />} />
        <Route path="/cart/list" element={<PrivateRoute element={<CartList />} />} />
        <Route path="/product/add" element={<PrivateRoute element={<AddProduct />} />} />
        <Route path="/dropdown" element={<PrivateRoute element={<CommonDropdown />} />} />  
        <Route path="/node/add" element={<PrivateRoute element={<AddNode />} />} />
        <Route path="/brand/add" element={<PrivateRoute element={<AddBrand />} />} />
        <Route path="/category/add" element={<PrivateRoute element={<AddCategory />} />} />
        {/* <Route path="/customer/add" element={<PrivateRoute element={<AddCustomer />} />} /> */}
        <Route path="/model/add" element={<PrivateRoute element={<AddModel />} />} />
        <Route path="/price/add" element={<PrivateRoute element={<AddPrice />} />} />
        <Route path="/shelf/add" element={<PrivateRoute element={<AddShelf />} />} />
        <Route path="/unit/add" element={<PrivateRoute element={<AddUnit />} />} />
        <Route path="/rack/add" element={<PrivateRoute element={<AddRack />} />} />
        <Route path="/role/add" element={<PrivateRoute element={<AddRole />} />} />
        <Route path="/warehouse/add" element={<PrivateRoute element={<AddWarehouse />} />} />
        <Route path="/stock/add" element={<PrivateRoute element={<AddStock />} />} />
        <Route path="/user/add" element={<PrivateRoute element={<AddUser />} />} />
        <Route path="/product/edit/:identifier" element={<PrivateRoute element={<EditProduct />} />} />
        <Route path="/brand/edit/:identifier" element={<PrivateRoute element={<EditBrand />} />} />
        <Route path="/price/edit/:identifier" element={<PrivateRoute element={<EditPrice />} />} />
        <Route path="/user/edit/:username" element={<PrivateRoute element={<EditUser />} />} />
        <Route path="/node/edit/:identifier" element={<PrivateRoute element={<EditNode />} />} />
        <Route path="/role/edit/:identifier" element={<PrivateRoute element={<EditRole />} />} />
        <Route path="/category/edit/:identifier" element={<PrivateRoute element={<EditCategory />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
