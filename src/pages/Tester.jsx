import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const Tester = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
const userId = currentUser?.id;
    console.log("User ID:", userId);  // Debugging

    if (!userId) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/${userId}/dashboard`);
        console.log("API Response:", response.data);
        setBookings(response.data.receivedBookings);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!bookings.length) return <Alert variant="info">No bookings received</Alert>;

  return (
    <div>
      <h3>Received Bookings</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Property</th>
            <th>Guest</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.listingId?.title || "Unknown Property"}</td>
              <td>{booking.customerId?.username || "Unknown"}</td>
              <td>{booking.customerId?.email || "No Email"}</td>
              <td>{new Date(booking.startDate).toLocaleDateString()}</td>
              <td>{new Date(booking.endDate).toLocaleDateString()}</td>
              <td>${booking.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tester;
