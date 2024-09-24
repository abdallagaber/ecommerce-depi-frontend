// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/Navbar";
import Home from "./components/ProductList";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return user ? true : false;
  });

  const handleLogin = (loggedInUser) => {
    console.log("Logged in user:", loggedInUser);
    setIsLoggedIn(true);
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser)); // Save to local storage
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user"); // Clear local storage on logout
  };

  return (
    <Router>
      <CustomNavbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/wishlist" element={<Wishlist user={user} />} />
        <Route path="/cart" element={<Cart user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
