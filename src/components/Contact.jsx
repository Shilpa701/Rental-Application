import React, { useState } from 'react';
import Header from '../components/Header';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import SERVER_URL from '../services/serverURL';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState(""); // To show success/error message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(""); // Reset status before submitting

    try {
      const response = await axios.post(`${SERVER_URL}/test/add-testimony`, formData);
      
      if (response.status === 200) {
        setStatus("Message sent successfully!");
        alert("Message Send Successfully")
        setFormData({ name: '', email: '', message: '' }); // Clear form after success
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Error submitting the form. Please check your connection.");
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h1 className="text-center mb-4" style={{ fontSize: '20px' }}> |Contact Us</h1>
        <h1 className='text-center fw-bolder text-dark'>GET IN TOUCH <br /> WITH OUR AGENT</h1>
        <Row className="justify-content-center">
          {/* Left Side - Map */}
          <Col lg={8} className="d-flex align-items-center">
            <iframe
              title="Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508619!2d144.95592831531593!3d-37.81720997975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e33!2sMelbourne%2C+Australia!5e0!3m2!1sen!2sus!4v1529514563323"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Col>

          {/* Right Side - Contact Form */}
          <Col lg={4}>
            <Form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 btn btn-dark">
                Send Message
              </Button>

              {status && <p className="text-center mt-3 text-danger">{status}</p>}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
