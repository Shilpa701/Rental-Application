import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../admin/Sidebar"; // Import Sidebar
import SERVER_URL from "../services/serverURL";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/all`);
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-3">
          <Card className="p-4">
            <h2 className="text-dark">All Bookings</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <Spinner animation="border" variant="primary" />
            ) : bookings.length === 0 ? (
              <p>No bookings available</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Property</th>
                    <th>Guest</th>
                    <th>Email</th>
                    <th>Host</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td>{index + 1}</td>
                      <td>{booking.listingId?.title || "Unknown Property"}</td>
                      <td>{booking.customerId?.username || "Unknown"}</td>
                      <td>{booking.customerId?.email || "No Email"}</td>
                      <td>{booking.hostId?.username || "Unknown"}</td>
                      <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                      <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                      <td>${booking.listingId?.price || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;
