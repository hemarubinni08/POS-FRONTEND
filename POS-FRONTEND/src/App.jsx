import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import Profile from '../components/Profile';
import ProductList from '../components/product/List';
import ProductAdd from '../components/product/Add';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Manager", "Admin"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/list"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route 
          path="/unauthorized" 
          element={
            <div className="p-6 text-center">
              <h1 className="text-2xl text-red-600">Unauthorized Access</h1>
              <p>You don't have permission to access this page.</p>
            </div>
          } 
        />
        <Route
          path="/product/add"
          element={
            <ProtectedRoute>
              <ProductAdd />
            </ProtectedRoute>

          }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
