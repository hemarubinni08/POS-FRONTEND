import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProductList from "./pages/product/ProductList";
import ProductForm from "./pages/product/ProductForm";
import BrandList from "./pages/brand/BrandList";
import BrandForm from "./pages/brand/BrandForm";
import CategoryList from "./pages/category/CategoryList";
import CategoryForm from "./pages/category/CategoryForm";
import CustomerList from "./pages/customer/CustomerList";
import CustomerForm from "./pages/customer/CustomerForm";
import ModelList from "./pages/model/ModelList";
import NodeList from "./pages/node/NodeList";
import PriceList from "./pages/price/PriceList";
import RackList from "./pages/rack/RackList";
import RoleList from "./pages/role/RoleList";
import ShelfList from "./pages/shelf/ShelfList";
import StockList from "./pages/stock/StockList";
import UnitList from "./pages/unit/UnitList";
import UserList from "./pages/user/UserList";
import WarehouseList from "./pages/warehouse/WarehouseList";
import WarehouseForm from "./pages/warehouse/WarehouseForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/list" element={<ProductList />} />
        <Route path="/product/add" element={<ProductForm />} />
        <Route path="/product/edit/:identifier" element={<ProductForm />} />
        <Route path="/brand/list" element={<BrandList/>} />
        <Route path="/brand/add" element={<BrandForm />} />
        <Route path="/brand/edit/:id" element={<BrandForm />} />
        <Route path="/category/list" element={<CategoryList/>} />
        
<Route path="/category/add" element={<CategoryForm />} />
<Route path="/category/edit/:id" element={<CategoryForm />} />

        <Route path="/customer/list" element={<CustomerList/>} />
        <Route path="/customer/add" element={<CustomerForm />} />
<Route path="/customer/edit/:id" element={<CustomerForm />} />
        <Route path="/model/list" element={<ModelList/>} />
        <Route path="/node/list" element={<NodeList/>} />
        <Route path="/price/list" element={<PriceList/>} />
        <Route path="/Racks/list" element={<RackList/>} />
        <Route path="/Role/list" element={<RoleList/>} />
        <Route path="/Shelf/list" element={<ShelfList/>} />
        <Route path="/Stock/list" element={<StockList/>} />
        <Route path="/Unit/list" element={<UnitList/>} />
        <Route path="/User/list" element={<UserList/>} />
        <Route path="/Warehouse/list" element={<WarehouseList/>} />
        
<Route path="/warehouse/add" element={<WarehouseForm />} />
<Route path="/warehouse/edit/:id" element={<WarehouseForm />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;