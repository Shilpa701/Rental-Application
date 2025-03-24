// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { facilities } from "../data";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import Loader from "../components/Loader";
// import Navbar from "../components/Header";
// import { Container, Row, Col, Image, Button } from "react-bootstrap";
// import SERVER_URL from "../services/serverURL";

// const ListingDetails = () => {
//   const [loading, setLoading] = useState(true);
//   const { listingId } = useParams();
//   const [listing, setListing] = useState(null);

//   const [alreadyBooked, setAlreadyBooked] = useState(false);

//   //2... const getListingDetails = async () => {
//   //   try {
//   //     const response = await fetch(`${SERVER_URL}/properties/${listingId}`);
//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch listing");
//   //     }
//   //     const data = await response.json();
//   //     setListing(data);







//    // Check if the user has already booked this property
//   //  const storedUser = JSON.parse(localStorage.getItem("user"));
//   //  if (storedUser && storedUser.id) {
//   //    const bookingResponse = await fetch(
//   //      `${SERVER_URL}/api/check?customerId=${storedUser.id}&listingId=${listingId}`
//   //    );
//   //    const bookingData = await bookingResponse.json();
//   //    setAlreadyBooked(bookingData.alreadyBooked); // true if booked
//   //  }

    
//   //   } catch (err) {
//   //     console.error("Fetch Listing Details Failed", err.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   getListingDetails();
//   // }, [listingId]);







//   const getListingDetails = async () => {
//     try {
//       // Fetch listing details
//       const response = await fetch(`${SERVER_URL}/properties/${listingId}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch listing");
//       }
//       const data = await response.json();
//       setListing(data);
  
//       // Check if the property is already booked for the selected dates
//       const bookingResponse = await fetch(
//         `${SERVER_URL}/api/check?listingId=${listingId}&startDate=${dateRange[0].startDate.toISOString()}&endDate=${dateRange[0].endDate.toISOString()}`
//       );
//       const bookingData = await bookingResponse.json();
//       setAlreadyBooked(bookingData.alreadyBooked); // true if booked
  
//     } catch (err) {
//       console.error("Fetch Listing Details Failed", err.message);
//     } finally {
//       setLoading(false);
//     }
//   };



//   useEffect(() => {
//     getListingDetails();
//   }, [listingId]);





//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);

//   //2..... const handleSelect = (ranges) => {
//   //   setDateRange([ranges.selection]);
//   // };

//   // const start = new Date(dateRange[0].startDate);
//   // const end = new Date(dateRange[0].endDate);
//   // const dayCount = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));

//   const handleSelect = async (ranges) => {
//     const { startDate, endDate } = ranges.selection;
  
//     // Validate dates
//     if (!startDate || !endDate || startDate > endDate) {
//       alert("Please select valid dates.");
//       return;
//     }
  
//     // Update date range state
//     setDateRange([{ startDate, endDate, key: "selection" }]);
  
//     // Re-check booking status for the new dates
//     try {
//       const bookingResponse = await fetch(
//         `${SERVER_URL}/api/check?listingId=${listingId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
//       );
  
//       if (!bookingResponse.ok) {
//         throw new Error("Failed to check booking status");
//       }
  
//       const bookingData = await bookingResponse.json();
//       setAlreadyBooked(bookingData.alreadyBooked); // true if booked
//     } catch (error) {
//       console.error("Error checking booking status:", error);
//       alert("Failed to check booking availability. Please try again.");
//     }
//   };




//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
    
//     if (!storedUser || !storedUser.id) {
//       alert("You need to be logged in to book.");
//       return;
//     }
  
//     const bookingDetails = {
//       customerId: storedUser.id, // ✅ Correct User ID
//       listingId: listingId, // ✅ Correct Listing ID
//       hostId: listing?.creator?._id, 
//       startDate: dateRange[0].startDate.toISOString(),
//       endDate: dateRange[0].endDate.toISOString(),
//       totalPrice: listing.price * dayCount,
//     };
  
//     console.log("Sending Booking Details:", bookingDetails); // Debugging log
  
//     try {
//       const response = await fetch(`${SERVER_URL}/api/booking`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingDetails),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Booking failed");
//       }
      
//       alert("Booking successful!");
//       navigate("/home");
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert("Error booking property.");
//     }
//   };
  
  
  
  
  

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Navbar />
//       <Container  className="listing-details mt-4">
//         <h1  className="mt-5 fw-bolder text-dark">{listing.title}</h1>
//         <Row>
//           {listing.listingPhotoPaths?.map((photo, index) => (
//             <Col key={index} md={4} className="mb-3">
//               <Image src={`${SERVER_URL}${photo}`} alt="listing photo"  className="listing-image" fluid rounded />
//             </Col>
//           ))}
//         </Row>

//         <h2 className="text-black">{listing.type} in {listing.city}, {listing.country}</h2>
//         <p>{listing.guestCount} guests - {listing.bedroomCount} bedroom(s) - {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)</p>
//         <hr />


        

       
//         <p>State: {listing.state}</p>
//         <p>PinCode: {listing.pincode}</p>
//         <p>LandMark: {listing.landmark}</p>

//         <hr />

   
//         <div className="profile d-flex align-items-center">
//   {listing.creator ? (
//     <>
//       <h4 className="text-black fw-bolder">Hosted by<span className="text-primary"> {listing.creator.username}</span></h4>
//     </>
//   ) : (
//     <h3>Host details not available</h3>
//   )}
// </div>
//         <hr />

//         <h4 className="fw-bolder text-black">Description</h4>
//         <p>{listing.description}</p>

//         <hr />
         
       

//         <h4 className="fw-bolder text-black">Hightlight: {listing.highlight}</h4>
//         <p>{listing.highlightDesc}</p>
//         <hr />

//         <div className="booking">
//           <h2 className="fw-bolder text-dark">What this place offers?</h2>
//           <Row>
//             {listing.amenities.map((item, index) => (
//               <Col key={index} md={3} className="mb-3">
//                 <div className="facility d-flex align-items-center fw-bolder fs-5 text-primary">
//                   <div className="facility_icon me-2">
//                     {facilities.find((facility) => facility.name === item)?.icon}
//                   </div>
//                   <p>{item}</p>
//                 </div>
//               </Col>
//             ))}
//           </Row>

//           <h2 className="text-dark">How long do you want to stay?</h2>
//           <DateRange ranges={dateRange} onChange={handleSelect} />
//           <h2>${listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}</h2>
//           <h2 className="fw-bolder">Total price: ${listing.price * dayCount}</h2>
//           <p>Start Date: {dateRange[0].startDate.toLocaleDateString()}</p>
//           <p>End Date: {dateRange[0].endDate.toLocaleDateString()}</p>

//           {/* <Button variant="danger" onClick={handleSubmit} className="mt-3 w-25"  disabled={alreadyBooked}> {alreadyBooked ? "Already Booked" : "BOOK NOW"}</Button> */}


//           <Button
//   variant="danger"
//   onClick={handleSubmit}
//   className="mt-3 w-25"
//   disabled={alreadyBooked}
// >
//   {alreadyBooked ? "Already Booked" : "BOOK NOW"}
// </Button>
//         </div>
//       </Container>
     
//     </>
//   );
// };
// export default ListingDetails;



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
import Review from "../components/Review"; // Ensure this component exists

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [existingBooking, setExistingBooking] = useState(null);
  
  const [bookedDates, setBookedDates] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isBooking, setIsBooking] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [reviews, setReviews] = useState([]); // State for reviews
  const [formattedUnavailableDates, setFormattedUnavailableDates] = useState([]);
  
  const navigate = useNavigate();

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) || 1);

  // Fetch listing details, bookings, and reviews
  const fetchListingDetails = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/properties/${listingId}`);
      if (!response.ok) throw new Error("Failed to fetch listing details");
      const data = await response.json();
      setListing(data);
  
      // Fetch all bookings for the listing
      const bookingResponse = await fetch(`${SERVER_URL}/api/bookings/${listingId}`);
      if (bookingResponse.ok) {
        const bookings = await bookingResponse.json();
        const dates = [];
  
        bookings.forEach((booking) => {
          let currentDate = new Date(booking.startDate);
          const endDate = new Date(booking.endDate);
  
          while (currentDate <= endDate) {
            dates.push(new Date(currentDate)); // Store actual Date objects
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
  
        setUnavailableDates(dates);
        console.log("Unavailable Dates:", unavailableDates);
      }
    } catch (error) {
      console.error("Error fetching listing details:", error);
      alert("Failed to load listing details. Please try again.");
    }
  };





  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/api/bookings/${listingId}`);
        const data = await response.json();
  
        if (data.alreadyBooked) {
          console.log("Fetched Booking Data:", data); // ✅ Debugging
          setBookedDates(data.dates); // ✅ Store booked dates properly
        } else {
          setBookedDates([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [listingId]);
  
  console.log("Final Booked Dates in State:", bookedDates);
  

  

  // Check booking status for selected dates
  const checkBookingStatus = async (startDate, endDate) => {
    try {
      const bookingResponse = await fetch(
        `${SERVER_URL}/api/check?listingId=${listingId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );
      if (!bookingResponse.ok) {
        throw new Error("Failed to check booking status");
      }
      const bookingData = await bookingResponse.json();
      console.log("Fetched bookings:", bookingData);
      setAlreadyBooked(!!bookingData.overlappingBooking);
      setExistingBooking(bookingData.overlappingBooking || null);
    } catch (error) {
      console.error("Error checking booking status:", error);
      alert("Failed to check booking availability. Please try again.");
    }
  };

  // Handle review submission
  const handleSubmitReview = async (reviewText) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser.id) {
      alert("You need to be logged in to leave a review.");
      return;
    }

    const reviewData = {
      listingId,
      userId: storedUser.id,
      userName: storedUser.username,
      comment: reviewText,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${SERVER_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const newReview = await response.json();
      setReviews([...reviews, newReview]); // Update reviews state
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchListingDetails();
      await checkBookingStatus(dateRange[0].startDate, dateRange[0].endDate);
      setLoading(false);
    };

    fetchData();
  }, [listingId]);

  const handleSelect = async (ranges) => {
    const { startDate, endDate } = ranges.selection;

    if (!startDate || !endDate || startDate > endDate) {
      alert("Please select valid dates.");
      return;
    }

    setDateRange([{ startDate, endDate, key: "selection" }]);
    await checkBookingStatus(startDate, endDate);
  };

  const handleSubmit = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (!storedUser || !storedUser.id) {
      alert("You need to be logged in to book.");
      return;
    }
  
    // Convert selected date range to string format for comparison
    const selectedStartDate = dateRange[0].startDate.toISOString().split("T")[0];
    const selectedEndDate = dateRange[0].endDate.toISOString().split("T")[0];
  
    // Check if selected dates are already booked
    const isOverlap = unavailableDates.some(
      (date) => date >= selectedStartDate && date <= selectedEndDate
    );
  
    if (isOverlap) {
      alert("The selected dates are already booked. Please choose different dates.");
      return;
    }
  
    setIsBooking(true);
  
    const bookingDetails = {
      customerId: storedUser.id,
      listingId: listingId,
      hostId: listing?.creator?._id,
      startDate: dateRange[0].startDate.toISOString(),
      endDate: dateRange[0].endDate.toISOString(),
      totalPrice: listing.price * dayCount,
    };
  
    try {
      const response = await fetch(`${SERVER_URL}/api/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Booking failed");
      }
  
      alert("Booking successful!");
      await fetchListingDetails(); // Refresh unavailable dates
      navigate("/properties");
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.message || "Error booking property.");
    } finally {
      setIsBooking(false);
    }
  };
  
  

  if (loading) {
    return <Loader />;
  }

  if (!listing) {
    return (
      <Container className="text-center mt-5">
        <h2>Listing not found</h2>
        <Button onClick={() => navigate("/home")}>Go back to home</Button>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container className="listing-details mt-4">
        <h1 className="mt-5 fw-bolder text-dark">{listing.title}</h1>
        <Row>
          {listing.listingPhotoPaths?.map((photo, index) => (
            <Col key={index} md={4} className="mb-3">
              <Image
                src={`${SERVER_URL}${photo}`}
                alt="listing photo"
                className="listing-image"
                fluid
                rounded
              />
            </Col>
          ))}
        </Row>

        <h2 className="text-black">
          {listing.type} in {listing.city}, {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) - {listing.bedCount} bed(s) -{" "}
          {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <p>State: {listing.state}</p>
        <p>PinCode: {listing.pincode}</p>
        <p>LandMark: {listing.landmark}</p>
        <hr />

        <div className="profile d-flex align-items-center">
          {listing.creator ? (
            <>
              <h4 className="text-black fw-bolder">
                Hosted by<span className="text-primary"> {listing.creator.username}</span>
              </h4>
            </>
          ) : (
            <h3>Host details not available</h3>
          )}
        </div>
        <hr />

        <h4 className="fw-bolder text-black">Description</h4>
        <p>{listing.description}</p>
        <hr />

        <h4 className="fw-bolder text-black">Highlight: {listing.highlight}</h4>
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
          <Row>



  <Col md={6}>
    <h2 className="text-dark">How long do you want to stay?</h2>
    <DateRange
      key={unavailableDates.length}
      ranges={dateRange}
      onChange={handleSelect}
      minDate={new Date()}
      disabledDates={unavailableDates} // Disabled dates for all users
    />

    {/* Display unavailable dates below the date picker */}
    {bookedDates.length > 0 ? (
  <ul>
    {bookedDates.map((date, index) => (
      <li key={index}>
        <strong>Booked from:</strong> {new Date(date.startDate).toLocaleDateString()} - 
        <strong> to</strong> {new Date(date.endDate).toLocaleDateString()}
      </li>
    ))}
  </ul>
) : (
  <p>No bookings yet.</p>
  
)}

    <h2>
      ${listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}
    </h2>
    <h2 className="fw-bolder">Total price: ${listing.price * dayCount}</h2>
    <p>Start Date: {dateRange[0].startDate.toLocaleDateString()}</p>
    <p>End Date: {dateRange[0].endDate.toLocaleDateString()}</p>

    {alreadyBooked && existingBooking && (
      <div className="mt-3">
        <h4 className="text-danger">This property is already booked for the following dates:</h4>
        <p>
          <strong>Start Date:</strong> {new Date(existingBooking.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong> {new Date(existingBooking.endDate).toLocaleDateString()}
        </p>
      </div>
    )}

    <Button
      variant="danger"
      onClick={handleSubmit}
      className="mt-3 w-25"
      disabled={alreadyBooked || isBooking}
    >
      {isBooking ? "Booking..." : alreadyBooked ? "Already Booked" : "BOOK NOW"}
    </Button>
  </Col>



            <Col md={6}>
              <Review reviews={reviews} onSubmitReview={handleSubmitReview} listingId={listing._id}/>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default ListingDetails;