import { Routes, Route, Navigate } from "react-router-dom";
 
import Login from "./components/Login";
import Register from "./components/Register";
 
import Dashboard1 from "./components/Dashboard1";
import ProductList from "./components/product/ProductList";
import UserList from "./components/user/UserList";
import UserProfile from "./components/user/UserProfile";
 
import MainLayout from "./components/MainLayout";

 
function App() {
  return (
    <Routes>
 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
 
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/product/list" element={<ProductList />} />
        <Route path="/user/list" element={<UserList />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Route>
 
    </Routes>
  );
}
 
export default App;