import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import CartComponent from "./components/CartComponent";

const RoutesComponent = () => {
  const  isAuthenticated  = useSelector((state) => state.auth.token);

  return (
    // <Router basename="/ecommers">
    <Router>
      <Routes>
        {/* Public Routes (Accessible only if NOT logged in) */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={ <Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/home" />} />

        {/* Private Routes (Accessible only if LOGGED IN) */}
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/cart" element={isAuthenticated ? <CartComponent /> : <Navigate to="/login" />} />

        {/* Catch-all: Redirect to Home if route not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
