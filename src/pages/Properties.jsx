import React, { useState } from 'react'
import Header from '../components/Header'
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { categories,types,features } from '../data.js';
import island from '../assets/island.jpg'
import camping1 from '../assets/camping1.jpg'


const Properties = () => {


    const [selectedcategory,setSelectedcategory]=useState("All")
  
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Header/>
    <div style={{ paddingTop: '100px'}} className="container-fluid">
      <h4>Welcome User,</h4>
    <h1 className="properties-heading">Our Properties</h1>




    <Container className="py-4 text-center">
      <Row className="justify-content-center g-3">
        {categories?.map((item, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex">
            <Link to="" className="text-decoration-none w-100">
              <Card
                className={`category-card border-0 shadow-sm text-center ${
                selectedcategory=== item.label ? "selected-category" : ""
                }`}
                onClick={() => setSelectedcategory(item.label)}
              >
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
    {/* <Container className="py-4 text-center">
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
    </Container> */}





    <Row className="mt-3">
  <Col className="mb-3" sm={12} md={6} lg={4}>
    <Card style={{ width: '18rem', borderRadius: '15px', position: 'relative' }}  className='btn shadow'>
      <i
        className="fa fa-heart"
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          fontSize: '20px',
          color: 'white',
          cursor: 'pointer',
        }}
      ></i>
      <Card.Img
        variant="top"
        src={camping1}
        alt="Image Description"
        style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
        
      />
      <Card.Body>
        <Card.Text>
          <div>
            <p><strong>Address:</strong> 123 Main Street</p>
            <p><strong>City:</strong> Sample City</p>
            <p><strong>Country:</strong> Sample Country</p>
            <p><strong>Rate Per Night:</strong> $200</p>
          </div>
        </Card.Text>
     
      </Card.Body>
    </Card>
  </Col>




  <Col className="mb-3" sm={12} md={6} lg={4}>
    <Card style={{ width: '18rem', borderRadius: '15px', position: 'relative' }} className='btn shadow'>
      <i
        className="fa fa-heart"
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          fontSize: '20px',
          color: 'white',
          cursor: 'pointer',
        }}
      ></i>
      <Card.Img
        variant="top"
        src={island}
        alt="Image Description"
        style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
      />
      <Card.Body>
        <Card.Text>
          <div>
            <p><strong>Address:</strong> 456 Elm Street</p>
            <p><strong>City:</strong> Another City</p>
            <p><strong>Country:</strong> Another Country</p>
            <p><strong>Rate Per Night:</strong> $250</p>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
</Row>


   
    </div>
    </>
  )
}

export default Properties