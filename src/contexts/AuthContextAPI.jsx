import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticatedAPI } from "../services/allAPI.js";

const AuthContext = createContext();

const AuthContextAPI = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await isAuthenticatedAPI();
      if (response.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Default export
export default AuthContextAPI;

// ✅ Named export
export const useAuth = () => useContext(AuthContext);
