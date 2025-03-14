import { useEffect, useState } from "react";
import { categories } from "../data";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { Container, Row, Col, Button } from "react-bootstrap";
import SERVER_URL from "../service/serverURL";

const Listings = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [listings, setListings] = useState([]);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `${SERVER_URL}/properties?category=${selectedCategory}`
          : `${SERVER_URL}/properties`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
  
      const data = await response.json();
      setListings(data);  // Update state with fetched listings
      setLoading(false);
    } catch (err) {
      console.error("Fetch Listings Failed:", err.message);
    }
  };
  
  // Fetch listings when component mounts or category changes
  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);
  
console.log(listings);

  return (
    <Container>
      <Row className="category-list mb-4">
        {categories?.map((category, index) => (
          <Col key={index} className="text-center">
            <Button
              variant={category.label === selectedCategory ? "primary" : "outline-primary"}
              onClick={() => setSelectedCategory(category.label)}
            >
              {category.icon} {category.label}
            </Button>
          </Col>
        ))}
      </Row>

      {loading ? (
        <Loader />
      ) : (
        <Row className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <Col key={_id} md={4} className="mb-4">
                <ListingCard
                  listingId={_id}
                  creator={creator}
                  listingPhotoPaths={listingPhotoPaths}
                  city={city}
                  province={province}
                  country={country}
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                />
              </Col>
            )
          )}
        </Row>
      )}
    </Container>
  );
};

export default Listings;
