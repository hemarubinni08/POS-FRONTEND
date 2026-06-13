import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

import Product from "./pages/product/Product";
import ProductAdd from "./pages/product/ProductAdd";
import ProductEdit from "./pages/product/ProductEdit";
import Shelf from "./pages/shelf/Shelf";
import ShelfAdd from "./pages/shelf/ShelfAdd";
import ShelfEdit from "./pages/shelf/ShelfEdit";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES (NO LAYOUT) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>}/>
        <Route element={<Layout />}>
        <Route path="/profile" element={<Profile />} />

          {/* PRODUCT ROUTES */}
          <Route path="/product/list" element={<Product />} />
          <Route path="/product/add" element={<ProductAdd />} />
          <Route path="/product/edit/:identifier" element={<ProductEdit />} />
          <Route path="/shelf/list" element={<Shelf/>} />
          <Route path="/shelf/add" element={<ShelfAdd />} />
          <Route path="/shelf/edit/:identifier" element={<ShelfEdit />} />

        </Route>

        {/* DEFAULT REDIRECT */}
        <Route path="/" element={<Login />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;