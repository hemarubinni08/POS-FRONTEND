import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
//import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Profile from './components/Profile';
import ProductList from './components/ProductList';
import ProductAdd from './components/ProductAdd';
import Dashboard1 from './components/Dashboard1';
import UserList from './components/UserList';
import Product from './components/Product';
import RackList from './components/RackList';
import ShelfList from './components/ShelfList';
import ModelsList from './components/ModelsList';
import BrandList from './components/BrandList';
import RoleList from './components/RoleList';
import WarehouseList from './components/WarehouseList';
import StockList from './components/StockList';
import NodeList from './components/NodeList';
import PriceList from './components/PriceList';
import CategoryList from './components/CategoryList';
import UnitList from './components/UnitList';
import CustomerList from './components/CustomerList';
import ShelfAdd from './components/ShelfAdd';
import RackAdd from './components/RackAdd';
import Shelf from './components/Shelf';
import Rack from './components/Rack';
import Models from './components/Models';
import ModelsAdd from './components/ModelsAdd';
import MainLayout from './components/MainLayout';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/add" element={<Register />} />
        <Route path="/register" element={<Register />} />
``
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
         <Route path="/profile" element={<Profile />} />
         <Route path="/user/edit" element={<Profile />} />
         <Route path="/product/list" element={<ProductList />} />
          <Route path="/product/add" element={<ProductAdd />} />
            <Route path="/dashboard1" element={<Dashboard1 />} />
             <Route path="/user/list" element={<UserList/>} />
              <Route path="/product/get" element={<Product/>} />
              <Route path="/rack/list" element={<RackList />} />
              <Route path="/shelf/list" element={<ShelfList />} />
              <Route path="/models/list" element={<ModelsList />} />
               <Route path="/brand/list" element={<BrandList />} />
               <Route path="/role/list" element={<RoleList />} />
                <Route path="/warehouse/list" element={<WarehouseList />} />
                <Route path="/stock/list" element={<StockList />} />
                <Route path="/node/list" element={<NodeList />} />
                 <Route path="/price/list" element={<PriceList />} />
                  <Route path="/category/list" element={<CategoryList />} />
                   <Route path="/unit/list" element={<UnitList />} />
                   <Route path="/customer/list" element={<CustomerList />} />
                   <Route path="/shelf/add" element={<ShelfAdd />} />
                   <Route path="/rack/add" element={<RackAdd />} />
                   <Route path="/shelf/get" element={<Shelf/>} />
                    <Route path="/rack/get" element={<Rack/>} />
                    <Route path="/models/get" element={<Models/>} />
                    <Route path="/models/add" element={<ModelsAdd />} />
              </Route>



    
        
        {/* Redirect root path to Dashboard1 */}
        <Route path="/" element={<Login />} />
        
        <Route 
          path="/unauthorized" 
          element={
            <div className="p-6 text-center">
              <h1 className="text-2xl text-red-600">Unauthorized Access</h1>
              <p>You don't have permission to access this page.</p>
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
