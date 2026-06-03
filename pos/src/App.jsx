import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard1 from "./components/Dashboard1";
import ProductList from "./pages/product/ProductList";
import UserList from "./pages/user/UserList";
import UserProfile from "./pages/user/UserProfile";
import MainLayout from "./components/MainLayout";
import UserUpdate from "./pages/user/UserUpdate";

function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
  <Route path="/" element={<Navigate to="/login" />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/product/list" element={<ProductList />} />
        <Route path="/user/list" element={<UserList />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/update" element={<UserUpdate />} />
      </Route>
    </Routes>
  );
}

export default App;