import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import User from './User'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProductList from './pages/ProductList'
import UserList from './pages/UserList'
import ShelfsList from './pages/ShelfsList'
import Home from './pages/Home'
import SideBar from './components/SideBar'
import WarehouseList from './pages/WarehouseList'
import CategoryList from './pages/categoryList'
import StockList from './pages/StockList'
import Add from './components/Add'



function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}>
           <Route path="/user/list" element={<UserList/>} />
           <Route path="/product/list" element={<ProductList/>} />
           <Route path="/profile" element={<Profile/>} />
           <Route path="/warehouse/list" element={<WarehouseList/>} />
           <Route path="/shelfs/list" element={<ShelfsList/>}/>
           <Route path="/category/list" element={<CategoryList/>}/>
           <Route path="/stock/list" element={<StockList/>}/>
           <Route path="/add" element={<Add/>} />
          </Route>

          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          {/* <Route path="/profile" element={<Profile/>} /> */}
          {/* <Route path="/product" element={<ProductList/>} /> */}
          {/* <Route path="/user" element={<UserList/>} /> */}
          {/* <Route path="/shelfs" element={<ShelfsList/>}/> */}
          <Route path="/nodes" element={<SideBar/>}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
