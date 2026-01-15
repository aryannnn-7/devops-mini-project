import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load auth state from localStorage on page load
  useEffect(() => {
    try {
      const storedLogin = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(storedLogin);
    } catch (err) {
      console.error("Error reading login state from localStorage:", err);
      setIsLoggedIn(false);
    }
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Error saving login state:", err);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    } catch (err) {
      console.error("Error clearing login state:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
