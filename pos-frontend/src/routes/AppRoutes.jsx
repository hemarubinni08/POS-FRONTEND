import {
 
    BrowserRouter,
    Routes,
    Route
 
} from "react-router-dom";
 
import LoginPage from "../pages/auth/LoginPage";
 
import DashboardPage from "../pages/dashboard/DashboardPage";
 
import ProtectedRoute from "./ProtectedRoute";
 
function AppRoutes() {
 
    return (
 
        <BrowserRouter>
 
            <Routes>
 
                <Route
                    path="/"
                    element={<LoginPage />}
                />
 
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
 
                            <DashboardPage />
 
                        </ProtectedRoute>
                    }
                />
 
            </Routes>
 
        </BrowserRouter>
    );
}
 
export default AppRoutes;