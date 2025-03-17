import Navbar from "../components/Header";
import ListingCard from "../components/ListingCard.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { useWishlist } from "../contexts/WishlistContext.jsx";

const WishList = () => {
  const { wishlist } = useWishlist();

  return (
    <>
      <Navbar />
      <Container>
        <h1 className="text-center my-5">Your Wish List</h1>
        <Row>
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <Col key={item.listingId} md={4} sm={6} className="mb-4">
                <ListingCard {...item} />
              </Col>
            ))
          ) : (
            <p className="text-center">No items in your wishlist.</p>
          )}
        </Row>
      </Container>
    
    </>
  );
};

export default WishList;



