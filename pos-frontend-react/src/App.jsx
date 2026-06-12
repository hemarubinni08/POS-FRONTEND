import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";
import ListUser from "./pages/user/ListUser";
import ListProduct from "./pages/Product/ListProduct";
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import ListNode from "./pages/node/ListNode";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/list" element={<ListProduct />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/edit/:identifier" element={<EditProduct />} />
        <Route path="/user/list" element={<ListUser />} />
        <Route path="/user/add" element={<AddUser />} />
        <Route path="/user/edit/:username" element={<EditUser />} />
        <Route path="/node/list" element={<ListNode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;