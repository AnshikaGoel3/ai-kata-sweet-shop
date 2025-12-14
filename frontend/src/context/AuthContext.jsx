import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
       
        setUser({ 
          username: decoded.sub || decoded.username, 
          role: decoded.role || "USER" 
        });
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await api.post("/api/auth/login", { username, password });
    const token = res.data.token; 
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({ username: decoded.sub, role: decoded.role });
    return true;
  };

  const register = async (userData) => {
    await api.post("/api/auth/register", userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);