import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, changePassword as apiChangePassword } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    // Load persisted auth state on mount
    const savedToken = localStorage.getItem("token") || localStorage.getItem("userToken");
    const savedUser = localStorage.getItem("loggedInUser");

    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user", err);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      
      // Save token and user details
      const userToken = data.token;
      const userData = data.user || { email };

      setToken(userToken);
      setUser(userData);

      localStorage.setItem("token", userToken);
      localStorage.setItem("userToken", userToken);
      localStorage.setItem("loggedInUser", JSON.stringify(userData));

      return { success: true, user: userData, isFirstLogin: data.isFirstLogin || userData.isFirstLogin };
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || "Login failed";
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userToken");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("adminToken");
  };

  const updatePassword = async (newPassword) => {
    setError(null);
    setLoading(true);
    try {
      const response = await apiChangePassword(newPassword);
      return response;
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || "Failed to update password";
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, logout, updatePassword, certificates, setCertificates }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
