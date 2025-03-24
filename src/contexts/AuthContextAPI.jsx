// import { createContext, useContext, useEffect, useState } from "react";
// import { isAuthenticatedAPI } from "../services/allAPI.js";

// const AuthContext = createContext();

// const AuthContextAPI = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const response = await isAuthenticatedAPI();
//       if (response.success) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       setIsAuthenticated(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextAPI;


// export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useEffect, useState } from "react";
// import { isAuthenticatedAPI } from "../services/allAPI.js";

// const AuthContext = createContext();

// const AuthContextAPI = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userId, setUserId] = useState(null); // ✅ Track userId
//   const [userName, setUserName] = useState(null); // ✅ Track userName
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async () => {
//     try {
//       const response = await isAuthenticatedAPI();
//       if (response?.success) {
//         setIsAuthenticated(true);
//         setUserId(response.userId); // ✅ Save userId
//         setUserName(response.userName); // ✅ Save userName
//       } else {
//         setIsAuthenticated(false);
//         setUserId(null);
//         setUserName(null);
//       }
//     } catch (error) {
//       setIsAuthenticated(false);
//       setUserId(null);
//       setUserName(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, userId, userName, setIsAuthenticated, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContextAPI;

// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // ✅ Check token structure
        setUserId(decoded.userId || decoded.id);
        setUserName(decoded.username || decoded.email);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setIsAuthenticated(false);
      }
    }
  }, []); // ✅ Empty dependency array

  const login = (token) => {
    if (!token) {
      console.error("No token provided for login");
      return;
    }

    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded Token:", decoded);
      setUserId(decoded.userId || decoded.id);
      setUserName(decoded.username || decoded.email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserId(null);
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
