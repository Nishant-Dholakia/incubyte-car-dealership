import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Inventory from "../pages/Inventory";
import Admin from "../pages/Admin";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  const handleRegisterSubmit = (data) => {
    console.log("Register form submitted:", data);
  };

  const handleLoginSubmit = (data) => {
    console.log("Login form submitted:", data);
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login onSubmit={handleLoginSubmit} />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register onSubmit={handleRegisterSubmit} />
          </PublicRoute>
        } 
      />
      <Route 
        path="/inventory" 
        element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        } 
      />
    </Routes>
  );
}
