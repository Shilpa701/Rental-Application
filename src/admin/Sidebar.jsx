import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

      const navigate = useNavigate(); // Initialize navigate
    // Logout function
    const handleLogout = () => {
      localStorage.removeItem("authToken"); // Remove token (if stored)
      sessionStorage.removeItem("authToken"); // Remove from session storage (if used)
      navigate("/login"); // Redirect to login page
    };
  return (

    <Nav className="flex-column bg-light p-3" style={{ height: "100vh" }}>
   <div className="fw-bolder text-primary fs-5"> <i className="fa-solid fa-house"></i> VILLA Admin</div>
    
     <Nav.Link as={NavLink} to="/admin" className="fw-bolder fs-5 text-black mt-5"><i class="fa-solid fa-circle-user"></i>Dashboard</Nav.Link>
      <Nav.Link as={NavLink} to="/admin/users"  className="fw-bolder fs-5 text-black mt-3"><i class="fa-solid fa-users"></i>Users</Nav.Link>
      <Nav.Link as={NavLink} to="/admin/properties"  className="fw-bolder fs-5 text-black mt-3"><i class="fa-solid fa-building-user"></i>Properties</Nav.Link>
      <Nav.Link as={NavLink} to="/admin/messages"  className="fw-bolder fs-5 text-black mt-3"><i class="fa-solid fa-message"></i>Messages</Nav.Link>

      <Nav.Link as={NavLink} to="/admin/booking"  className="fw-bolder fs-5 text-black mt-3"><i class="fa-solid fa-certificate"></i>Bookings</Nav.Link>


          {/* Logout Button (Bottom of Sidebar) */}
          <Button variant="danger" className="mt-auto w-100" onClick={handleLogout}>
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
    </Nav>
  );
};

export default Sidebar;
