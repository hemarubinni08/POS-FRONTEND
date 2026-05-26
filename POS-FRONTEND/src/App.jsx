import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import NodeList from './pages/node/NodeList';
import ProductList from './pages/product/ProductList';
import ProductAdd from './pages/product/ProductAdd';
import RoleList from './pages/role/RoleList';
import UnitList from './pages/unit/UnitList';
import CategoryList from './pages/category/CategoryList';
import BrandList from './pages/brand/BrandList';
import CartList from './pages/cart/CartList';
import CustomerList from './pages/customer/CustomerList';
import PriceList from './pages/price/PriceList';
import RacksList from './pages/racks/RacksList';  
import ShelfsList from './pages/shelfs/ShelfsList'; 
import StockList from './pages/stock/StockList';
import UserList from './pages/user/UserList';
import WarehouseList from './pages/warehouse/WarehouseList';
import ModelsList from './pages/models/ModelsList';
import BrandAdd from './pages/brand/BrandAdd';
import CategoryAdd from './pages/category/CategoryAdd';
import ModelsAdd from './pages/models/ModelsAdd';
import NodeAdd from './pages/node/NodeAdd';    
import Home from './pages/Home';
import Profile from './pages/Profile';
import PriceAdd from './pages/price/PriceAdd';
import RacksAdd from './pages/racks/RacksAdd';
import RoleAdd from './pages/role/RoleAdd';
import ShelfsAdd from './pages/shelfs/ShelfsAdd';
import StockAdd from './pages/stock/StockAdd';
import UnitAdd from './pages/unit/UnitAdd';
import WarehouseAdd from './pages/warehouse/WarehouseAdd';
import BrandEdit from './pages/brand/BrandEdit';
import ModelsEdit from './pages/models/ModelsEdit';
import NodeEdit from './pages/node/NodeEdit';
import CategoryEdit from './pages/category/CategoryEdit';
import PriceEdit from './pages/price/PriceEdit';
import ProductEdit from './pages/product/ProductEdit';
import RacksEdit from './pages/racks/RacksEdit';
import RoleEdit from './pages/role/RoleEdit';
import ShelfsEdit from './pages/shelfs/ShelfsEdit';
import StockEdit from './pages/stock/StockEdit';
import UnitEdit from './pages/unit/UnitEdit';
import WarehouseEdit from './pages/warehouse/WarehouseEdit';
import UserAdd from './pages/user/UserAdd';
import CustomerAdd from './pages/customer/CustomerAdd';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to={isLoggedIn ? '/home' : '/login'} />} />
                <Route path='/login' element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
                <Route path='/profile' element={isLoggedIn ? <Profile /> : <Navigate to='/login' />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to='/login' />} />
                <Route path='/node' element={isLoggedIn ? <NodeList /> : <Navigate to='/login' />} />
                <Route path='/product' element={isLoggedIn ? <ProductList /> : <Navigate to='/login' />} />
                <Route path='/product/add' element={isLoggedIn ? <ProductAdd /> : <Navigate to='/login' />} />
                <Route path='/role' element={isLoggedIn ? <RoleList /> : <Navigate to='/login' />} />
                <Route path='/unit' element={isLoggedIn ? <UnitList /> : <Navigate to='/login' />} />
                <Route path='/category' element={isLoggedIn ? <CategoryList /> : <Navigate to='/login' />} />
                <Route path='/brand' element={isLoggedIn ? <BrandList /> : <Navigate to='/login' />} />
                <Route path='/brand/add' element={isLoggedIn ? <BrandAdd /> : <Navigate to='/login' />} />
                <Route path='/category/add' element={isLoggedIn ? <CategoryAdd /> : <Navigate to='/login' />} />
                <Route path='/customer' element={isLoggedIn ? <CustomerList /> : <Navigate to='/login' />} />
                <Route path='/price' element={isLoggedIn ? <PriceList /> : <Navigate to='/login' />} />
                <Route path='/cart' element={isLoggedIn ? <CartList /> : <Navigate to='/login' />} />
                <Route path='/racks' element={isLoggedIn ? <RacksList /> : <Navigate to='/login' />} />
                <Route path='/shelfs' element={isLoggedIn ? <ShelfsList /> : <Navigate to='/login' />} />
                <Route path='/stock' element={isLoggedIn ? <StockList /> : <Navigate to='/login' />} />
                <Route path='/user' element={isLoggedIn ? <UserList /> : <Navigate to='/login' />} />
                <Route path='/warehouse' element={isLoggedIn ? <WarehouseList /> : <Navigate to='/login' />} />
                <Route path='/models' element={isLoggedIn ? <ModelsList /> : <Navigate to='/login' />} />
                <Route path='/models/add' element={isLoggedIn ? <ModelsAdd /> : <Navigate to='/login' />} />
                <Route path='/node/add' element={isLoggedIn ? <NodeAdd /> : <Navigate to='/login' />} />
                <Route path='/price/add' element={isLoggedIn ? <PriceAdd /> : <Navigate to='/login' />} />
                <Route path='/racks/add' element={isLoggedIn ? <RacksAdd /> : <Navigate to='/login' />} />
                <Route path='/role/add' element={isLoggedIn ? <RoleAdd /> : <Navigate to='/login' />} />
                <Route path='/shelfs/add' element={isLoggedIn ? <ShelfsAdd /> : <Navigate to='/login' />} />
                <Route path='/stock/add' element={isLoggedIn ? <StockAdd /> : <Navigate to='/login' />} />
                <Route path='/unit/add' element={isLoggedIn ? <UnitAdd /> : <Navigate to='/login' />} />
                <Route path='/warehouse/add' element={isLoggedIn ? <WarehouseAdd /> : <Navigate to='/login' />} />
                <Route path='/models/edit/:identifier' element={isLoggedIn ? <ModelsEdit /> : <Navigate to='/login' />} />
                <Route path='/node/edit/:identifier' element={isLoggedIn ? <NodeEdit /> : <Navigate to='/login' />} />
                <Route path='/brand/edit/:identifier' element={isLoggedIn ? <BrandEdit /> : <Navigate to='/login' />} />
                <Route path='/category/edit/:identifier' element={isLoggedIn ? <CategoryEdit /> : <Navigate to='/login' />} />
                <Route path='/price/edit/:identifier' element={isLoggedIn ? <PriceEdit /> : <Navigate to='/login' />} />
                <Route path='/product/edit/:identifier' element={isLoggedIn ? <ProductEdit /> : <Navigate to='/login' />} />
                <Route path='/racks/edit/:identifier' element={isLoggedIn ? <RacksEdit /> : <Navigate to='/login' />} />
                <Route path='/role/edit/:identifier' element={isLoggedIn ? <RoleEdit /> : <Navigate to='/login' />} />
                <Route path='/shelfs/edit/:identifier' element={isLoggedIn ? <ShelfsEdit /> : <Navigate to='/login' />} />
                <Route path='/stock/edit/:identifier' element={isLoggedIn ? <StockEdit /> : <Navigate to='/login' />} />
                <Route path='/unit/edit/:identifier' element={isLoggedIn ? <UnitEdit /> : <Navigate to='/login' />} />
                <Route path='/warehouse/edit/:identifier' element={isLoggedIn ? <WarehouseEdit /> : <Navigate to='/login' />} />
                <Route path='/user/add' element={isLoggedIn ? <UserAdd/> : <Navigate to = '/login' />} />
                <Route path='/customer/add' element={isLoggedIn ? <CustomerAdd /> : <Navigate to='/login' />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;