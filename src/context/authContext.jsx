import { createContext, useEffect, useState, useCallback } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token); // Store token in localStorage
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/auth/validate', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status === 200) {
          const user = JSON.parse(localStorage.getItem("user"));
          setCurrentUser(user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        logout();
      }
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
