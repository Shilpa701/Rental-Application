import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Badge, Modal } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { FaEye } from "react-icons/fa"; // Eye icon
import axios from "axios";
import SERVER_URL from "../services/serverURL";

const AdProperties = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // const BASE_URL = "http://localhost:5000"; 

  // Fetch property list
  const getPropertyList = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/properties`);
      setPropertyList(response.data);
    } catch (err) {
      console.error("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);




  const updatePropertyStatus = async (id, status) => {
    try {
      const response = await axios.put(`${SERVER_URL}/test/properties/${id}/status`, {
        status: status,  // Dynamically set status
      });
  
      // ✅ Update frontend state properly
      setPropertyList(propertyList.map((p) =>
        p._id === id ? { ...p, status: status } : p
      ));
    } catch (err) {
      console.error(`Error updating property status to ${status}:`, err.message);
    }
  };





  const deleteProperty = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`${SERVER_URL}/test/properties/${id}`);
        setPropertyList(propertyList.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Error deleting property:", err.message);
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar Section */}
        <Col md={3}>
          <Sidebar />
        </Col>

        {/* Main Content Section */}
        <Col md={9} className="p-3">
          <Card className="p-4">
            <h2 className="mb-4">Manage Properties</h2>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th> {/* Serial Number */}
                  <th>Title</th>
                  <th>City</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {propertyList.length > 0 ? (
                  propertyList.map((property, index) => (
                    <tr key={property._id}>
                      <td>{index + 1}</td> {/* Serial Number */}
                      <td>{property.title}</td>
                      <td>{property.city}</td>
                      <td>{property.city}, {property.state}</td>
                      <td>₹{property.price}</td>
                      <td className="text-center">
  <Button variant="primary" size="sm" onClick={() => { setSelectedProperty(property); setShowModal(true); }}>
    <FaEye />
  </Button>
</td>
                      <td>
  <span className={`badge ${property.status === "Approved" ? "bg-success" : property.status === "Rejected" ? "bg-danger" : "bg-warning text-dark"}`}>
    {property.status}
  </span>
</td>
<td>
  <div className="d-flex gap-2">
    {property.status !== "Approved" && (
      <Button variant="success" size="sm" onClick={() => updatePropertyStatus(property._id, "Approved")}>
        <i className="fa-solid fa-check"></i>
      </Button>
    )}
    {property.status !== "Rejected" && (
      <Button variant="danger" size="sm" onClick={() => updatePropertyStatus(property._id, "Rejected")}>
        <i className="fa-solid fa-x"></i>
      </Button>
    )}
  </div>
</td>

<td>
<Button variant="outline-danger" size="sm" onClick={() => deleteProperty(property._id)}>
      <i className="fa-solid fa-trash"></i>
    </Button>
</td>


                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No properties found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Property Details Modal */}
     {/* Property Details Modal */}
<Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Property Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProperty && (
      <div>
       
        <p><strong>Title:</strong> {selectedProperty.title}</p>
        <p><strong>Description:</strong> {selectedProperty.description}</p>
        <p><strong>Category:</strong> {selectedProperty.category}</p>
        <p><strong>Type:</strong> {selectedProperty.type}</p>
        <p><strong>Location:</strong> {selectedProperty.streetAddress}, {selectedProperty.city}, {selectedProperty.country}</p>

        <p><strong>Guests:</strong> {selectedProperty.guestCount}</p>
        <p><strong>Bedrooms:</strong> {selectedProperty.bedroomCount}</p>
        <p><strong>Beds:</strong> {selectedProperty.bedCount}</p>
        <p><strong>Bathrooms:</strong> {selectedProperty.bathroomCount}</p>

        <p><strong>Price:</strong> ₹{selectedProperty.price} / night</p>

        <p><strong>Amenities:</strong> {selectedProperty.amenities?.join(", ") || "No amenities listed"}</p>

        <p><strong>Highlight:</strong> {selectedProperty.highlight}</p>
        <p><strong>Highlight Description:</strong> {selectedProperty.highlightDesc}</p>

        {/* Property Images */}
        {selectedProperty.listingPhotoPaths && selectedProperty.listingPhotoPaths.length > 0 && (
          <div>
            <strong>Photos:</strong>
            <div className="d-flex flex-wrap mt-2">
            {selectedProperty.listingPhotoPaths.map((photo, index) => (
              <img 
                key={index} 
                src={`${SERVER_URL}${photo}`}  // Prepend Base URL
                alt={`Property ${index}`} 
                className="m-1 rounded" 
                style={{ width: "100px", height: "80px", objectFit: "cover" }} 
                onError={(e) => e.target.src = "https://via.placeholder.com/100x80"} // Fallback Image
              />
            ))}
            </div>
          </div>
        )}
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
};

export default AdProperties;
