import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import Navbar from "../components/Header";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import SERVER_URL from "../services/serverURL";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const getListingDetails = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/properties/${listingId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch listing");
      }
      const data = await response.json();
      setListing(data);



   // Check if the user has already booked this property
   const storedUser = JSON.parse(localStorage.getItem("user"));
   if (storedUser && storedUser.id) {
     const bookingResponse = await fetch(
       `${SERVER_URL}/api/check?customerId=${storedUser.id}&listingId=${listingId}`
     );
     const bookingData = await bookingResponse.json();
     setAlreadyBooked(bookingData.alreadyBooked); // true if booked
   }

    
    } catch (err) {
      console.error("Fetch Listing Details Failed", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (!storedUser || !storedUser.id) {
      alert("You need to be logged in to book.");
      return;
    }
  
    const bookingDetails = {
      customerId: storedUser.id, // ✅ Correct User ID
      listingId: listingId, // ✅ Correct Listing ID
      hostId: listing?.creator?._id, 
      startDate: dateRange[0].startDate.toISOString(),
      endDate: dateRange[0].endDate.toISOString(),
      totalPrice: listing.price * dayCount,
    };
  
    console.log("Sending Booking Details:", bookingDetails); // Debugging log
  
    try {
      const response = await fetch(`${SERVER_URL}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed");
      }
      
      alert("Booking successful!");
      navigate("/home");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Error booking property.");
    }
  };
  
  
  
  
  

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <Container  className="listing-details mt-4">
        <h1  className="mt-5 fw-bolder text-dark">{listing.title}</h1>
        <Row>
          {listing.listingPhotoPaths?.map((photo, index) => (
            <Col key={index} md={4} className="mb-3">
              <Image src={`${SERVER_URL}${photo}`} alt="listing photo"  className="listing-image" fluid rounded />
            </Col>
          ))}
        </Row>

        <h2 className="text-black">{listing.type} in {listing.city}, {listing.country}</h2>
        <p>{listing.guestCount} guests - {listing.bedroomCount} bedroom(s) - {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)</p>
        <hr />


        {/* <h4 className="fs-3 text-black"> State: <span className="fs-5">{listing.state}</span></h4>
        <h4 className="fs-3 text-black"> Pincode: <span className="fs-5">{listing.pincode}</span></h4>
        <h4 className="fs-3 text-black">Landmark:<p className="fs-5">{listing.landmark}</p></h4> */}

       
        <p>State: {listing.state}</p>
        <p>PinCode: {listing.pincode}</p>
        <p>LandMark: {listing.landmark}</p>

        <hr />

        {/* <div className="profile d-flex align-items-center">
          {/* <Image src={http://localhost:5000${listing.creator.profileImagePath}} alt="host" roundedCircle width={50} height={50} className="me-3" /> */}
          {/* <h3>Hosted by <span className="fw-bolder text-dark">{listing.creator?.username}</span></h3>
        </div> */} 
        <div className="profile d-flex align-items-center">
  {listing.creator ? (
    <>
      <h4 className="text-black fw-bolder">Hosted by<span className="text-primary"> {listing.creator.username}</span></h4>
    </>
  ) : (
    <h3>Host details not available</h3>
  )}
</div>
        <hr />

        <h4 className="fw-bolder text-black">Description</h4>
        <p>{listing.description}</p>

        <hr />
         
       

        <h4 className="fw-bolder text-black">Hightlight: {listing.highlight}</h4>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <h2 className="fw-bolder text-dark">What this place offers?</h2>
          <Row>
            {listing.amenities.map((item, index) => (
              <Col key={index} md={3} className="mb-3">
                <div className="facility d-flex align-items-center fw-bolder fs-5 text-primary">
                  <div className="facility_icon me-2">
                    {facilities.find((facility) => facility.name === item)?.icon}
                  </div>
                  <p>{item}</p>
                </div>
              </Col>
            ))}
          </Row>

          <h2 className="text-dark">How long do you want to stay?</h2>
          <DateRange ranges={dateRange} onChange={handleSelect} />
          <h2>${listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}</h2>
          <h2 className="fw-bolder">Total price: ${listing.price * dayCount}</h2>
          <p>Start Date: {dateRange[0].startDate.toLocaleDateString()}</p>
          <p>End Date: {dateRange[0].endDate.toLocaleDateString()}</p>

          <Button variant="danger" onClick={handleSubmit} className="mt-3 w-25"  disabled={alreadyBooked}> {alreadyBooked ? "Already Booked" : "BOOK NOW"}</Button>
        </div>
      </Container>
     
    </>
  );
};
export default ListingDetails;