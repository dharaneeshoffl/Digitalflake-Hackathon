import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import SubCategory from "./pages/SubCategory";
import Product from "./pages/Product";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  const isAuth = !!localStorage.getItem("token");

  return (
    <Routes>
      
      <Route
        path="/"
        element={<Navigate to={isAuth ? "/dashboard" : "/login"} />}  />

      
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />

      <Route
        path="/signup"
        element={isAuth ? <Navigate to="/dashboard" /> : <Signup />} />

    
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

      <Route
        path="/category"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subcategory"
        element={
          <ProtectedRoute>
            <SubCategory />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        }
      />

    
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
