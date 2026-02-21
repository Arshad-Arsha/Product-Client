import React, { createContext, useState } from "react";
import API from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/user-login", { email, password });

      if (response.data.success) {
        // Ensure your backend sends "user" object in data
        setUser(response.data);
        return response.data; 
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await API.get("/auth/user-logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );

};
