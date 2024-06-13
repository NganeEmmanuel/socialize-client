import { createContext, useEffect, useState, useCallback } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const checkAuth = useCallback(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      // Optionally, validate the token here with an API call
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AuthContext.Provider value={{ currentUser, login, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
