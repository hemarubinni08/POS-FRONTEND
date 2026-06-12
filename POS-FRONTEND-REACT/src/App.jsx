import React from "react";
import { useState } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Profile from "./Pages/Profile";
import ProductList from "./Pages/Product/ProductList";
import ProductAdd from "./Pages/Product/ProductAdd";
import ProductUpdate from "./Pages/Product/ProductUpdate";
import BrandList from "./Pages/Brand/BrandList";
import BrandAdd from "./Pages/Brand/BrandAdd";
import BrandUpdate from "./Pages/Brand/BrandUpdate";
import ShelfList from "./Pages/Shelf/ShelfList";
import ShelfAdd from "./Pages/Shelf/ShelfAdd";
import ShelfUpdate from "./Pages/Shelf/ShelfUpdate";
import RacksList from "./Pages/Racks/RacksList";
import RacksAdd from "./Pages/Racks/RacksAdd";
import RacksUpdate from "./Pages/Racks/RacksUpdate";
import ModelList from "./Pages/Model/ModelList";
import ModelAdd from "./Pages/Model/ModelAdd";
import CategoryList from "./Pages/Category/CategoryList";
import CategoryAdd from "./Pages/Category/CategoryAdd";
import CategoryUpdate from "./Pages/Category/CategoryUpdate";
import UserList from "./Pages/User/UserList";
import UserAdd from "./Pages/User/UserAdd";
import UserUpdate from "./Pages/User/UserUpdate";
import PriceList from "./Pages/Price/PriceList";
import PriceAdd from "./Pages/Price/PriceAdd";
import PriceUpdate from "./Pages/Price/PriceUpdate";
import Component from "./Component/demo/component";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/shoaib' element={<Component>Shoaib Component</Component>} />
        <Route path='/login' element={<Login onLoginSuccess={(user) => setIsLoggedIn(true)}  />} />
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path= '/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/product' element={<ProductList />} />
        <Route path='/profile/product/add' element={<ProductAdd />} />
        <Route path='/profile/product/edit/:id' element={<ProductUpdate />} />
        <Route path='/profile/brand' element={<BrandList />} />
        <Route path='/profile/brand/add' element={<BrandAdd />} />
        <Route path='/profile/brand/edit/:identifier' element={<BrandUpdate />} />
        <Route path='/profile/shelf' element={<ShelfList />} />
        <Route path='/profile/shelf/add' element={<ShelfAdd />} />
        <Route path='/profile/shelf/edit/:identifier' element={<ShelfUpdate />} />
        <Route path='/profile/racks' element={<RacksList />} />
        <Route path='/profile/racks/add' element={<RacksAdd />} />
        <Route path='/profile/racks/edit/:id' element={<RacksUpdate />} />
        <Route path='/profile/models' element={<ModelList />} />
        <Route path='/profile/models/add' element={<ModelAdd />} />
        <Route path='/profile/models/edit/:id' element={<ModelAdd />} />
        <Route path='/profile/category' element={<CategoryList />} />
        <Route path='/profile/category/add' element={<CategoryAdd />} />
        <Route path='/profile/category/edit/:id' element={<CategoryUpdate />} />
        <Route path='/profile/user' element={<UserList />} />
        <Route path='/profile/user/add' element={<UserAdd />} />
        <Route path='/profile/user/edit/:username' element={<UserUpdate />} />
        <Route path='/profile/price' element={<PriceList />} />
        <Route path='/profile/price/add' element={<PriceAdd />} />
        <Route path='/profile/price/edit/:id' element={<PriceUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
