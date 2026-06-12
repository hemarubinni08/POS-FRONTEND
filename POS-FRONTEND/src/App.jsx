import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./routes/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import modelRoutes from "./routes/modelRoutes";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route 
            path="/edit-profile" 
            element={<EditProfile />} 
          />

          {

            modelRoutes.map((route) => (

              <Route
                key={route.basePath}
              >

                <Route
                  path={route.basePath}
                  element={<route.list />}
                />

                <Route
                  path={`${route.basePath}/add`}
                  element={<route.add />}
                />

                <Route
                  path={`${route.basePath}/edit/:identifier`}
                  element={<route.edit />}
                />

              </Route>

            ))

          }

        </Route>

      </Routes>

    </BrowserRouter>

  );

}

export default App;