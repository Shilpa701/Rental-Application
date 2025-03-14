import { logoutAPI } from "../services/api";
import { useAuth } from "../contexts/AuthContextAPI.jsx";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAPI();
    setIsAuthenticated(false);
    navigate("/home");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
