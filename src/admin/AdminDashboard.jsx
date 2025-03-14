import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "./Sidebar";
import { FaHome, FaUsers, FaClipboardList, FaSignOutAlt } from "react-icons/fa"; // Import logout icon
import SERVER_URL from "../services/serverURL";

const AdminDashboard = () => {
  const [approvedProperties, setApprovedProperties] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const [totalBookings, setTotalBookings] = useState(0); 


  // Fetch approved properties count
  const fetchApprovedProperties = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/admin/approved-properties-count`);
      const data = await response.json();
      setApprovedProperties(data.total);
    } catch (err) {
      console.error("Error fetching approved properties count:", err);
    }
  };

  // Fetch total users count
  const fetchTotalUsers = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/admin/total-users`);
      const data = await response.json();
      setTotalUsers(data.total);
    } catch (err) {
      console.error("Error fetching total users:", err);
    }
  };



    // ✅ Fetch total bookings count
    const fetchTotalBookings = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/admin/total-bookings`);
        const data = await response.json();
        setTotalBookings(data.total);
      } catch (err) {
        console.error("Error fetching total bookings:", err);
      }
    };


  useEffect(() => {
    const fetchData = async () => {
      await fetchApprovedProperties();
      await fetchTotalUsers();
      await fetchTotalBookings();
      setLoading(false);
    };
    fetchData();
  }, []);



  return (
    <Container fluid className="bg-light min-vh-100">
      <Row>
        {/* Sidebar */}
        <Col md={3} className="bg-white shadow-sm vh-100 p-3 d-flex flex-column">
          <Sidebar />
          
      
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary">Admin Dashboard</h2>

          
          </div>

          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Row className="g-4">
              {/* Approved Properties */}
              <Col md={4}>
                <Card className="text-center shadow-lg border-0 bg-white p-3">
                  <Card.Body>
                    <FaHome size={50} className="text-primary mb-3" />
                    <h5 className="text-muted">Approved Properties</h5>
                    <h2 className="fw-bold">{approvedProperties}</h2>
                  </Card.Body>
                </Card>
              </Col>

              {/* Total Users */}
              <Col md={4}>
                <Card className="text-center shadow-lg border-0 bg-white p-3">
                  <Card.Body>
                    <FaUsers size={50} className="text-success mb-3" />
                    <h5 className="text-muted">Total Users</h5>
                    <h2 className="fw-bold">{totalUsers}</h2>
                  </Card.Body>
                </Card>
              </Col>

              {/* Total Bookings (Placeholder - Replace with API) */}
              <Col md={4}>
                <Card className="text-center shadow-lg border-0 bg-white p-3">
                  <Card.Body>
                    <FaClipboardList size={50} className="text-warning mb-3" />
                    <h5 className="text-muted">Total Bookings</h5>
                    <h2 className="fw-bold">{totalBookings}</h2>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}

          {/* Dynamic Content */}
          {/* <Card className="p-4 mt-4 shadow-sm border-0 bg-white">
            <Outlet />
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
