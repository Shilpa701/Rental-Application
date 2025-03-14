import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import SERVER_URL from "../services/serverURL";
import WishList from "./Wishlist";

const PropertyList = () => {
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [propertyList, setPropertyList] = useState([]);
  const navigate = useNavigate();

  // const getPropertyList = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/properties");
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch properties");
  //     }
  //     const data = await response.json();
  //     setPropertyList(data);
  //   } catch (err) {
  //     console.error("Fetch all properties failed", err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getPropertyList = async () => {
    setLoading(true);
    try {
      const url = searchCity
        ? `${SERVER_URL}/properties/search/${searchCity}`
        : `${SERVER_URL}/test/all-approved-property`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      
      const data = await response.json();
      setPropertyList(data);

      const approvedProperties = data.filter(property => property.status === "Approved");
      setPropertyList(approvedProperties);
    } catch (err) {
      console.error("Fetch properties failed:", err.message);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
  
    getPropertyList();
  }, [searchCity]);

  console.log("Property List Data:", propertyList);

  return (
    <>
      <Header />
      <Container>
        <h1 className="title-list text-center mt-5">Your Property List</h1>

        <input className="mb-5 rounded-pill"  type="text"
            placeholder="Search a city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)} />


        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row>
            {propertyList.map(({ _id, creator, listingPhotoPaths, city, country, category, type, price, booking = false }) => (
              <Col key={_id} md={4} className="mb-4">
                <ListingCard
                  listingId={_id}
                  creator={creator?.username}
                  listingPhotoPaths={listingPhotoPaths.map(photo => `${SERVER_URL}${photo}`)} 
                  city={city}
                  
                  country={country}
                  
                  category={category}
                  type={type}
                  price={price}
                  booking={booking}
                  
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      
    </>
  );
};

export default PropertyList;