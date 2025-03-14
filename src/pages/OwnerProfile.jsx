import { useEffect, useState } from "react";
import { Container, Table, Spinner, Card, Alert } from "react-bootstrap";
import axios from "axios";
import SERVER_URL from "../services/serverURL";
import Header from "../components/Header";

const OwnerProfile = () => {
  const [properties, setProperties] = useState([]); 
  const [bookings, setBookings] = useState([]); 
  const [userBookings, setUserBookings] = useState([]); 
  const [receivedBookings, setReceivedBookings] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get logged-in user details from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;




  const handleCancelBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await axios.delete(`${SERVER_URL}/api/bookings/${bookingId}`);
        // Remove the canceled booking from state
        setUserBookings(userBookings.filter((booking) => booking._id !== bookingId));
        alert("Booking canceled successfully!");
      } catch (err) {
        console.error("Failed to cancel booking:", err);
        alert("Failed to cancel booking. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (!userId) {
      setError("User ID is missing");
      setLoading(false);
      return;
    }





    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/api/${userId}/dashboard`);
        setProperties(data.properties);
        setBookings(data.bookings);
        setUserBookings(data.bookings);
        setReceivedBookings(data.receivedBookings || []); 
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <Card className="mt-5 p-3 shadow w-50">
          <h3>{storedUser?.username || "N/A"}</h3>
          <p>Email: {storedUser?.email || "N/A"}</p>
        </Card>

        {error && <Alert variant="danger">{error}</Alert>}
        {loading && <Spinner animation="border" variant="primary" />}

        {/* Property Section */}
        <h2 className="mb-4">Your Properties</h2>
        {properties.length === 0 ? (
          <p>No property added.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Property Name</th>
                <th>Category</th>
                <th>City</th>
                <th>Street Address</th>
                <th>State</th>
                <th>Country</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={property._id}>
                  <td>{index + 1}</td>
                  <td>{property.title || "Unnamed Property"}</td>
                  <td>{property.category}</td>
                  <td>{property.city}</td>
                  <td>{property.streetAddress}</td>
                  <td>{property.state}</td>
                  <td>{property.country}</td>
                  <td>${property.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* User's Booking Section */}
        <h2 className="mt-4">Your Bookings</h2>
        {userBookings.length === 0 ? (
          <p>You haven't booked any properties yet.</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Property Name</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Price</th>
                <th>Cancel Booking</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.listingId?.title || "No listing"}</td>
                  <td>
                    {booking.listingId?.streetAddress}, {booking.listingId?.city}, {booking.listingId?.country}
                  </td>
                  <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td>${booking.totalPrice}</td>
                  <td>
            <button
              className="btn btn-danger"
              onClick={() =>handleCancelBooking(booking._id)}
            >
              Cancel
            </button>
          </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Received Bookings (From Tester) */}
        <h2 className="mt-4">Received Bookings</h2>
        {receivedBookings?.length === 0 ? (
          <p>No bookings received</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Guest</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {receivedBookings.map((booking) => (
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
        )}
      </Container>
    </>
  );
};

export default OwnerProfile;
