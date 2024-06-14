import { createContext, useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { getLoggedInUserByUsername } from '../utils/APIFunctions';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (userData) => {
    const { username, token } = userData;  // Ensure userData has both username and token
    console.log("Logging in with username:", username, "and token:", token); // Log parameters
    try {
      const userResponse = await getLoggedInUserByUsername(username, token);  // Pass token as well
      const { id, name, profilePic } = userResponse;
      const user = {
        id,
        name,
        profilePic: profilePic || "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
        token,
      };
      setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token); // Store token in localStorage
    } catch (error) {
      console.error("Fetching user data failed:", error);
    }
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/get-user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { id, name, profilePic } = response.data;
        const user = {
          id,
          name,
          profilePic: profilePic || "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
          token,
        };
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Fetching user data failed:", error);
        logout();
      }
    } else if (!token) {
      logout();
    }
  }, [currentUser, logout]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
