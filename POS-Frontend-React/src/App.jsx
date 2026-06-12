import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/Profile";
import Product from "./pages/Product/list-Product/page";
import AddProduct from "./pages/Product/add-Product/page";
import EditProduct from "./pages/Product/edit-Product/page";
import Dashboard from "./pages/dashboard";
import BrandList from "./pages/Brand/list-Brand";
import AddBrand from "./pages/Brand/add-Brand";
import EditBrand from "./pages/Brand/edit-Brand";
import UserList from "./pages/User/list-User";
import EditUser from "./pages/User/edit-User";
import AddUser from "./pages/User/add-User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/product/list" element={<Product />} />
      <Route path="/dashboard/product/add" element={<AddProduct />}/>
      <Route path="/dashboard/product/edit/:identifier" element={<EditProduct />}/>
      <Route path="/dashboard/brand/list" element={<BrandList />}/>     
      <Route path="/dashboard/brand/add" element={<AddBrand />}/>     
      <Route path="/dashboard/brand/edit/:identifier" element={<EditBrand />}/> 
      <Route path="/dashboard/user/list" element={<UserList/>}/> 
      <Route path="/dashboard/user/edit/:identifier" element={<EditUser />}/> 
      <Route path="/dashboard/user/add" element={<AddUser />}/>
    </Routes>
  );
}

export default App;
