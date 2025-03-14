import { useState } from "react";
import { Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext";
// import "../styles/ListingCard.css"; // Ensure you have a CSS file for styling

const ListingCard = ({ listingId, listingPhotoPaths, city, country, category, type, price, booking }) => {
  const navigate = useNavigate();

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // const isInWishlist = (wishlist || []).some((item) => item._id === listingId);
  const isInWishlist = wishlist.some((item) => item.listingId === listingId);
  // const isInWishlist = wishlist.some((item) => item.id === listingId);
  const [currentIndex, setCurrentIndex] = useState(0);

  // const goToNextSlide = (e) => {
  //   e.stopPropagation();
  //   setCurrentIndex((prev) => (prev + 1) % listingPhotoPaths.length);
  // };

  // const goToPrevSlide = (e) => {
  //   e.stopPropagation();
  //   setCurrentIndex((prev) => (prev - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
  // };

  const goToNextSlide = (e) => {
    e.stopPropagation();
    if (listingPhotoPaths?.length) {
      setCurrentIndex((prev) => (prev + 1) % listingPhotoPaths.length);
    }
  };
  
  const goToPrevSlide = (e) => {
    e.stopPropagation();
    if (listingPhotoPaths?.length) {
      setCurrentIndex((prev) => (prev - 1 + listingPhotoPaths.length) % listingPhotoPaths.length);
    }
  };
  
  // ✅ Fix toggle logic and duplication
  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(listingId);
      alert("Removed from wishlist!");
    } else {
      addToWishlist({
        listingId,
        listingPhotoPaths,
        city,
        country,
        category,
        type,
        price,
        booking,
      });
      alert("Added to wishlist!");
    }
  };


  // const toggleWishlist = (e) => {
  //   e.stopPropagation();
  //   if (isInWishlist) {
  //     removeFromWishlist(listingId);
  //   } else {
  //     addToWishlist({
  //       listingId,
  //       listingPhotoPaths,
  //       city,
  //       country,
  //       category,
  //       type,
  //       price,
  //       booking,
  //     });
  //     alert("Added to wishlist!");
  //   }
  // };

  // const toggleWishlist = async (e) => {
  //   e.stopPropagation();
  
  //   if (isInWishlist) {
  //     await removeFromWishlist(listingId);
  //     alert("Removed from wishlist!");
  //   } else {
  //     await addToWishlist({
  //       id: listingId, // ✅ Ensure id matches backend expectation
  //       title: `${category} - ${type}`,
  //       city,
  //       country,
  //       price,
  //      listingPhotoPaths, // ✅ Take first image for display
  //       booking,
  //     });
  //     alert("Added to wishlist!");
  //   }
  // };
  
  
  


  return (
    <Col className="mb-3" sm={12} md={6} lg={4}>
      <Card style={{ width: '18rem', borderRadius: '15px', position: 'relative' }} className='btn shadow'>
        <i
          className="fa fa-heart favorite"
          style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            fontSize: '20px',
            // color: 'white',
            color: isInWishlist ? "red" : "white",
            cursor: 'pointer',
            // background: 'rgba(255, 255, 255, 0.9)',
            padding: '8px',
            borderRadius: '50%',
            zIndex: '10',
            
          }}
          onClick={(e) => toggleWishlist(e)}
        ></i>
        <div className="slider-container position-relative">
          <div className="slide">
            <img src={listingPhotoPaths?.[currentIndex] || "/uploads/default.jpg"} alt={`Property ${currentIndex + 1}`} className="img-fluid rounded" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            {listingPhotoPaths.length > 1 && (
              <>
                <Button variant="light" className="prev-button" onClick={goToPrevSlide} 
                  style={{ 
                    position: 'absolute', 
                    left: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    color: 'black',
                    border: 'none',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  &#9665;
                </Button>
                <Button variant="light" className="next-button" onClick={goToNextSlide} 
                  style={{ 
                    position: 'absolute', 
                    right: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.8)',
                    color: 'black',
                    border: 'none',
                    width: '35px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  &#9655;
                </Button>
              </>
            )}
          </div>
        </div>
        <Card.Body className="text-center">
          <Card.Title className="fw-bold">{category} - {type}</Card.Title>
          <Card.Text className="text-muted">
            <strong>City:</strong> {city} <br />
            <strong>Country:</strong> {country} <br />
            <strong>Rate Per Night:</strong> <span className="fw-bold text-primary">${price}</span> {booking ? <span className="text-danger">(Booked)</span> : ""}
          </Card.Text>
          <Button variant="primary" onClick={(e) => {
             e.stopPropagation();
             navigate(`/properties/${listingId}`);
              }}>
            View Details
          </Button>



        </Card.Body>
      </Card>
    </Col>
  );
};

export default ListingCard;