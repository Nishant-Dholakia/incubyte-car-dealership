import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Inventory from "../pages/Inventory";
import Admin from "../pages/Admin";

export default function AppRoutes() {
  const handleRegisterSubmit = (data) => {
    console.log("Register form submitted:", data);
  };

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register onSubmit={handleRegisterSubmit} />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
