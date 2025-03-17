import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Header from '../components/Header.jsx';
// import Footer from '../../components/Footer';
import home1 from '../assets/home1.jpg';
import home2 from '../assets/home6.jpg';
import home3 from '../assets/home5.jpg'
import Contact from '../components/Contact.jsx';
import about from '../assets/about.jpg'
import { categories,types,features } from '../data.js';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import SERVER_URL from '../services/serverURL.js';

const Home = () => {
  const [username, setUsername] = useState("");


  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/test/all-approved-feedback`);
      console.log("API Response:", response.data); // Debugging log
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    // Retrieve user info from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUsername(parsedUser.username || "User"); // Default to "User" if no username found
    }
  }, []);
  return (
    <>
      <Header />

      <div style={{ paddingTop: '100px'}} className="container-fluid">
        <div style={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
          <Carousel>
            {/* First Slide with Left-Aligned Bold Text */}
            <Carousel.Item>
              <img className="d-block w-100" src={home1} alt="First slide" />

              {/* Left-Aligned Bold Text */}
              <div 
                className="position-absolute top-50 start-0 translate-middle-y text-white fw-bold m-5"
                style={{ left: '10%', fontSize: '4rem' }} 
              >
                HURRY UP <br /> WELCOMES VILLA
              </div>

              {/* Centered Text */}
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                {/* <h2>First Slide Label</h2>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
              </div>
            </Carousel.Item>

            {/* Second Slide */}
            <Carousel.Item>
              <img className="d-block w-100" src={home2} alt="Second slide" />

              <div 
                className="position-absolute top-50 start-0 translate-middle-y text-white fw-bold m-5"
                style={{ left: '10%', fontSize: '4rem' }} 
              >
                BE QUICK<br /> GET THE BEST <br />VILLA IN TOWN
              </div>
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
              
              
                {/* <h2>Second Slide Label</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </div>
            </Carousel.Item>

            {/* Third Slide */}
            <Carousel.Item>
              <img className="d-block w-100" src={home3} alt="Third slide" />
              <div className="position-absolute top-50 start-50 translate-middle text-center text-white" style={{ left: '20%', fontSize: '4rem' }} >
            
              </div>
            </Carousel.Item>
          </Carousel>
        </div>

       
      </div>
      <div className="row mt-3">
          <div className="col-lg-12 m-5">
            <h1>Welcome <span className="text-warning">{username}</span></h1>
          </div>
        </div>
{/* about section */}
<div className='container' >
       <div className='row align-items-center'>
       <div className='col-lg-6'>
              <img style={{width:'800px'}} className='img-fluid' src={about} alt="landing" />
             </div>
             <div className='col-lg-6'>
             <h1 className='mb-4 text-center text-dark'>About Us</h1>

              <h1 style={{fontSize:'25px',color:'black'}}> <i class="fa-solid fa-house"></i>VILLA</h1>
              <p style={{textAlign:'justify',color:'darkgrey'}}>
              Welcome to our home rental platform, where finding the perfect place to stay has never been easier. Whether you're looking for a cozy apartment, a spacious home, or a short-term rental, we provide a seamless experience to help you discover the ideal property. Our platform allows you to browse listings by category, search for rentals using keywords, and save your favorite properties to a wishlist for easy access.

We ensure a smooth and secure experience with safe sign-up and login using JWT authentication and Bcrypt encryption. Property owners can create listings with detailed information, upload and manage photos effortlessly with drag-and-drop functionality, and update property details anytime. Renters can schedule visits and book rentals easily through our integrated calendar system.
            </p>
               
             </div>
             
       </div>
      </div>
     
      <div className='mt-5 text-center'>
     <h1 className='mb-4' style={{fontSize:'20px'}}>|Categories</h1>
     <h3 className='text-center fw-bolder text-dark'>Explore Our Categories <br /> Find Your Perfect Stay</h3>
     {/* sliding show effect tag marquee */}
   

     <Container className="py-4 text-center">

      <Row className="justify-content-center">
        {categories?.slice(1, 7).map((category, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-3">
            <Link to="" className="text-decoration-none">
              <Card className="category-card border-0 shadow-sm">
                <Card.Img src={category.img} alt={category.label} className="category-img" />
                <div className="category-overlay"></div>
                <Card.Body className="text-white position-absolute w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                  <div className="category-icon">{React.createElement(category.icon, { size: 30 })}</div>
                  <p className="fw-bold small mb-0">{category.label}</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>

{/* categories */}
     <Container className="py-4 text-center">
                <Row className="justify-content-center g-3"> 
                   {categories?.map((item, index) => (
                 <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex">
                   <Link to="" className="text-decoration-none w-100">
                 <Card className="category-card border-0 shadow-sm text-center">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center p-3">
                  {React.createElement(item.icon, { size: 30, className: "text-primary mb-2" })}
                  <p className="fw-bold small mb-0">{item.label}</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
    
    <div className='mt-5 text-center'>
     <h1 className='text-center fw-bolder text-dark'>We Provide The Best <br />Property You Like</h1>
     <Link to='/properties' className='btn btn-link mt-5'>CLICK HERE TO VIEW PROPERTIES...</Link>
    
     </div>


     {/* Reviews */}

        
     <div className="mt-5 text-center">
  <h3 className="text-center fw-bolder text-success">REVIEWS</h3>
  <p>Review Count: {reviews.length}</p> {/* Debugging Output */}
  
  <marquee behavior="scroll" direction="left" scrollamount="5">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <div 
          key={review._id} 
          className="d-inline-block mx-3 p-3 border rounded shadow-sm bg-light"
          style={{ minWidth: "200px", display: "inline-block" }}
        >
          <h5 className="fw-bold text-primary">{review.name}</h5>
          <p className="text-dark m-0">"{review.message}"</p>
        </div>
      ))
    ) : (
      <span>No reviews available</span>
    )}
  </marquee>
</div>

 
       
        <Container className="py-5 text-center">
      <h2 className="fw-bold mb-4 text-success">Why Choose Us?</h2>
      <Row className="justify-content-center">
        {features?.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-4">
            <Card className="shadow-sm border-0 p-3 h-100 feature-card text-center">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <div className="icon-container mb-3">
                  {item.icon ? React.createElement(item.icon, { size: 40, className: "text-success" }) : <FaCheckCircle size={40} className="text-success" />}
                </div>
                <h5 className="fw-bold text-dark">{item.name}</h5>
                <p className="text-muted small">{item.description}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

    
    
    </div>

  

<Contact/>


    
    </>
  );
};

export default Home;
