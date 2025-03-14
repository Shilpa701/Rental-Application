import { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";

const TripList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const hostId = "67c1dfa97c006d0203d59b24"; // Manu's ID

  const fetchBookings = async () => {
    try {
      const response = await fetch(`http://localhost:5000/owner/${hostId}`);
      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      console.log("Fetched Data:", data); // Debugging

      setBookings(data); // Assuming API already filters by hostId
    } catch (err) {
      console.error("Error fetching bookings:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Your Bookings</h2>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : bookings.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Listing Title</th>
              <th>Booked By</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.listingId?.title || "No listing"}</td>
                <td>{booking.customerId?.username || "Guest"}</td>
                <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                <td>${booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No bookings found.</p>
      )}
    </Container>
  );
};

export default TripList;
