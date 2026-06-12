// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './layouts/Layout'; 
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute'
import ProductList from './components/ProductList';
import ProductRegistration from './components/ProductRegistration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes with Layout */}
        <Route path="/layout" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        
        <Route path="/layout/product/list" element={<ProductList />} />
        <Route path="/layout/product/add" element={<ProductRegistration />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace/>} />
        <Route path="*" element={<Navigate to="/login" replace/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;