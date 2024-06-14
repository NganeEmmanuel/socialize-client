import { createContext, useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { getLoggedInUserByUsername } from '../utils/APIFunctions';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (userData) => {
    const { username } = userData;
    try {
      const userResponse = await getLoggedInUserByUsername(username);
      const { id, name, profilePic } = userResponse;
      const user = {
        id,
        name,
        profilePic: profilePic || "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
        token: userData.token,
      };
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", userData.token); // Store token in localStorage
    } catch (error) {
      console.error("Fetching user data failed:", error);
      // Handle the error if necessary
    }
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