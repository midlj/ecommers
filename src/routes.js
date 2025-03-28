import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const RoutesComponent = () => {
  const  isAuthenticated  = useSelector((state) => state.auth.token);

  return (
    <Router>
      <Routes>
        {/* Public Routes (Accessible only if NOT logged in) */}
        <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/home" />} />

        {/* Private Routes (Accessible only if LOGGED IN) */}
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />

        {/* Catch-all: Redirect to Home if route not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
