import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  const [isAccountVerified, setIsAccountVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    setIsAccountVerified(!!token);
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("isAccountVerified"); // Remove verification status
    setIsAccountVerified(false);
    navigate("/"); // Redirect to login
  };

  return (
    <Navbar className="border rounded position-fixed w-100 top-0 bg-white shadow-sm">
      <Container>
        {/* Logo / Brand */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Navbar.Brand className="fw-bolder text-dark">
            <i className="fa-solid fa-house"></i> VILLA
          </Navbar.Brand>
        </Link>

        {/* Menu */}
        <div className="d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="btn border rounded">
              <FiMenu style={{ color: "black", fontSize: "25px" }} />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              {isAccountVerified ? (
                <>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/wishList">Wish List</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/properties">Property List</Dropdown.Item>
                  
                  <Dropdown.Item as={Link} to="/createlist">Become A Host</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-danger" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/register">Sign Up</Dropdown.Item>
                 
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
