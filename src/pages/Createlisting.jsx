import React, { useState } from 'react'
import Header from '../components/Header'
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { categories,types,facilities  } from '../data';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import bg from '../assets/bg2.png'
import { useNavigate } from "react-router-dom";

import SERVER_URL from '../services/serverURL';



const Createlisting = () => {

  

// changes i made todAY and corresponding containers
  const [category,setCategory]=useState("")
  const [type,setType]=useState("")

  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress:"",
    city:"",
    state:"",
    pincode:"",
    country: "",
    landmark:"",

  });

  

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */

  const [guestCount, setGuestCount] = useState(1);
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);


    /* AMENITIES */
    const [amenities, setAmenities] = useState([]);

    const handleSelectAmenities = (facility) => {
      if (amenities.includes(facility)) {
        setAmenities((prevAmenities) =>
          prevAmenities.filter((option) => option !== facility)
        );
      } else {
        setAmenities((prev) => [...prev, facility]);
      }
    };

console.log(amenities);


 /* DESCRIPTION */
 const [formDescription, setFormDescription] = useState({
  title: "",
  description: "",
  highlight: "",
  highlightDesc: "",
  price: 0,
});

const handleChangeDescription = (e) => {
  const { name, value } = e.target;
  setFormDescription({
    ...formDescription,
    [name]: value,
  });
};


console.log(formDescription);




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const navigate = useNavigate();



  
  const handlePost = async (e) => {
    e.preventDefault();
    
    // Retrieve user data from localStorage
    const user = localStorage.getItem("user");
  
    if (!user) {
      console.error("User data is missing in localStorage!");
      return;
    }
  
    try {
      const userData = JSON.parse(user); // Parse JSON properly
  
      console.log("User data retrieved:", userData); // Debugging
  
      const userId = userData?.id || userData?._id; // Ensure correct property name
  
      if (!userId) {
        console.error("User ID is missing in stored user data!");
        return;
      }
  
      console.log("User ID:", userId); // Debugging
  
      // Create FormData object
      const listingForm = new FormData();
      listingForm.append("creator", userId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("city", formLocation.city);
      listingForm.append("state", formLocation.state);
      listingForm.append("pincode", formLocation.pincode);
      listingForm.append("country", formLocation.country);
      listingForm.append("landmark", formLocation.landmark);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", JSON.stringify(amenities));
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);
  
      // Append each selected photo
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });
  
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
  
        try {
          const result = await addProjectAPI(listingForm, reqHeader);
          if (result.status === 200) {
            alert("Project added Successfully");
            setAddProjectResponse(result);
            handleClose();
          } else {
            alert(result.response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
  
      // Send request to server
      const response = await fetch(`${SERVER_URL}/properties/create`, {
        method: "POST",
        body: listingForm,
      });
  
      if (response.ok) {
        navigate("/home");
        alert("Property added successfully!!!.... It will be displayed on the properties list after admin approval.");

      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };
  

/* State and Handlers for Photos */
const [photos, setPhotos] = useState([]);

// Handle File Upload
const handleUploadPhotos = (e) => {
  const newPhotos = Array.from(e.target.files);
  setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
};

// Handle Drag and Drop
const handleDragPhoto = (result) => {
  if (!result.destination) return;
  const items = [...photos];
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  setPhotos(items);
};

// Handle Remove Photo
const handleRemovePhoto = (indexToRemove) => {
  setPhotos((prevPhotos) => prevPhotos.filter((_, index) => index !== indexToRemove));
};
 

  
  return (
    <>
    <Header/>
    <div className='container-fluid ' style={{paddingTop:'100px', backgroundColor: "fafaf8"}}>
        <h1 className='fw-bolder text-black text-center' style={{fontSize:'30px'}}>Publish your place</h1>
        <form onSubmit={handlePost} action="" className='border border-white custom-form p-4 rounded shadow'>
            <h3 className='text-dark ' > Tell us about your place</h3><hr />
            <h3>Which of these categories to describe your place?</h3>
            <Container className="py-4 text-center">
  <Row className="justify-content-center g-3">
    {categories?.map((item, index) => (
      <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex">
        <Link to="" className="text-decoration-none w-100">
          <Card
            className={`category-card border-0 shadow-sm text-center ${
              category === item.label ? "selected-category" : ""
            }`}
            onClick={() => setCategory(item.label)}
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

<h2 className="mt-4 text-dark">What types of places will guests have?</h2>
<Container className="py-4">
  <Row className="justify-content-center">
    {types?.map((item, index) => (
      <Col key={index} xs={12} sm={6} md={4} lg={4} className="mb-3">
        <Card
          className={`shadow-sm border-0 p-3 h-100 ${
            type === item.name ? "selected-type" : ""
          }`}
          onClick={() => setType(item.name)}
        >
          <Card.Body className="d-flex align-items-center">
            <div className="me-3 fs-3 text-primary">
              {React.createElement(item.icon)}
            </div>
            <div>
              <h5 className="fw-bold">{item.name}</h5>
              <p className="text-muted small">{item.description}</p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>


  <h3 className='mt-4 text-dark'>Where is your place located?</h3>

  <label className="fw-bold" >Street Address</label>
  <input type="text" placeholder='Street Address' name='streetAddress' value={formLocation.streetAddress} onChange={handleChangeLocation} className='form-control w-50 mt-2' required />
  
  <label className='mt-1 fw-bold'>City</label>
  <input type="text" placeholder='City' name='city' value={formLocation.city} onChange={handleChangeLocation} className='form-control w-50 mt-2' required />

  <label className='mt-1 fw-bold'>State</label>
  <input type="text" placeholder='State' name='state' value={formLocation.state} onChange={handleChangeLocation} className='form-control w-50 mt-2' required />

  <label className='mt-1 fw-bold'>Pincode</label>
  <input type="text" placeholder='Pincode' name='pincode' value={formLocation.pincode} onChange={handleChangeLocation} className='form-control w-50 mt-2' required />

  <label className='mt-1 fw-bold'>Country</label>
  <input type="text" placeholder='Country' name='country' value={formLocation.country} onChange={handleChangeLocation} className='form-control w-50 mt-2' required />
  <label className='mt-1 fw-bold'>Landmark</label>
  <input type="text" placeholder='Landmark' name='landmark' value={formLocation.landmark} onChange={handleChangeLocation} className='form-control w-50 mt-2' required />

  {/* <div>
    <h3 className='mt-3'>Tell guests what your place has to offer</h3>
    <Container className="py-4 text-center">
      <Row className="justify-content-center g-3">
        {facilities.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex">
              <Card
                className={`category-card border-0 shadow-sm text-center ${amenities.includes(item.name) ? "selected-type" : ""}`}
                onClick={() => handleSelectAmenities(item.name)}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-3">
                  <IconComponent size={30} className="text-primary mb-2" />
                  <p className="fw-bold small mb-0">{item.name}</p>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  </div> */}

         
  <h3 className='mt-3'>Tell guests what your place has to offer</h3>
          <Container className="py-4 text-center">
            <Row className="justify-content-center g-3">
              {facilities.map((item, index) => (
                <Col key={index} xs={6} sm={4} md={3} lg={2} className="d-flex">
                  <Link to="" className="text-decoration-none w-100">
                    <Card
                      className={`category-card border-0 shadow-sm text-center ${amenities.includes(item.name) ? "selected-type" : ""}`}
                      onClick={() => handleSelectAmenities(item.name)}
                    >
                      <Card.Body className="d-flex flex-column align-items-center justify-content-center p-3">
                        {React.createElement(item.icon, { size: 30, className: "text-primary mb-2" })}
                        <p className="fw-bold small mb-0">{item.name}</p>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>




{/* Provide some basic details about your place */}
<Container className="mt-5">
      <h3 className="text-secondary text-lg mb-4">
        Provide some basic details about your place
      </h3>

      <Row className="g-4">
        {/* Guests */}
        <Col md={3}>
          <Card className="p-3 border rounded">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <p className="fw-semibold m-0">Guests</p>
              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => guestCount > 1 && setGuestCount(guestCount - 1)}
                >
                  −
                </Button>
                <span className="fw-bold">{guestCount}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setGuestCount(guestCount + 1)}
                >
                  +
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Bedrooms */}
        <Col md={3}>
          <Card className="p-3 border rounded">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <p className="fw-semibold m-0">Bedrooms</p>
              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => bedroomCount > 1 && setBedroomCount(bedroomCount - 1)}
                >
                  −
                </Button>
                <span className="fw-bold">{bedroomCount}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setBedroomCount(bedroomCount + 1)}
                >
                  +
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Beds */}
        <Col md={3}>
          <Card className="p-3 border rounded">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <p className="fw-semibold m-0">Beds</p>
              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => bedCount > 1 && setBedCount(bedCount - 1)}
                >
                  −
                </Button>
                <span className="fw-bold">{bedCount}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setBedCount(bedCount + 1)}
                >
                  +
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Bathrooms */}
        <Col md={3}>
          <Card className="p-3 border rounded">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <p className="fw-semibold m-0">Bathrooms</p>
              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => bathroomCount > 1 && setBathroomCount(bathroomCount - 1)}
                >
                  −
                </Button>
                <span className="fw-bold">{bathroomCount}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setBathroomCount(bathroomCount + 1)}
                >
                  +
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>


{/* For images of my properties */}

<h3>Add some photos of your place</h3>

<Container className="py-4">
      {/* <h2 className="text-center mb-4">Upload and Drag Images</h2> */}

      <DragDropContext onDragEnd={handleDragPhoto}>
        <Droppable droppableId="photos" direction="horizontal">
          {(provided) => (
            <Row
              className="justify-content-center border p-3 bg-light rounded"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* If no images uploaded */}
              {photos.length < 1 && (
                <Col xs={12} className="text-center">
                  <input id="image" type="file" className="d-none" accept="image/*" onChange={handleUploadPhotos} multiple />
                  <label htmlFor="image" className="btn btn-outline-primary">
                   <img style={{width:'100px'}} src={bg} alt="" />
                    Upload from your device
                  </label>
                </Col>
              )}

              {/* If images exist */}
              {photos.length >= 1 &&
                photos.map((photo, index) => (
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <Col xs="auto" className="p-2" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card style={{ width: "180px", height: "120px", position: "relative" }}>
                          <Card.Img variant="top" src={URL.createObjectURL(photo)} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
                          <Button
                            variant="danger"
                            size="sm"
                            className="position-absolute top-0 end-0 m-1 p-1"
                            onClick={() => handleRemovePhoto(index)}
                          >
                            <BiTrash size={16} />
                          </Button>
                        </Card>
                      </Col>
                    )}
                  </Draggable>
                ))}

              {/* Upload more images */}
              {photos.length >= 1 && (
                <Col xs="auto" className="p-2">
                  <input id="image" type="file" className="d-none" accept="image/*" onChange={handleUploadPhotos} multiple />
                  <label htmlFor="image" className="btn btn-outline-secondary">
                    <IoIosImages className="me-2" size={20} />
                    Upload more
                  </label>
                </Col>
              )}

              {provided.placeholder}
            </Row>
          )}
        </Droppable>
      </DragDropContext>
    </Container>

<h3 className='mt-4 text-dark'>What make your Place attractive and Exiciting?</h3>
        <div>
              {/* Title */}
              <div className="mb-3 w-50">
                <label className="fw-bold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formDescription.title}
                  className="form-control mt-2"
                  placeholder="Name of the Property"
                  onChange={handleChangeDescription}
                  required
                />
              </div>
              

              {/* Description */}
              <div className="mb-3 w-50">
                <p>Description</p>
              <textarea
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />
              </div>

              {/* Highlights */}
              <div className="mb-3 w-50">
                <label className="fw-bold">Highlights</label>
                <input
                  type="text"
                  name='highlight'
                  value={formDescription.highlight}
                  className="form-control mt-2"
                  placeholder="Enter main highlights"
                  onChange={handleChangeDescription}
                  required
                />
              </div>

              {/* Highlight Details */}
              <div className="mb-3 w-50">
                <label className="fw-bold">Highlight Details</label>
                <textarea
  type="text"
  name="highlightDesc"
  value={formDescription.highlightDesc}
  className="form-control mt-2"
  rows={2}
  placeholder="Enter highlight details"
  onChange={handleChangeDescription}
  required
></textarea>
              </div>

              {/* Price */}
              <div className="mb-3 w-25">
                <label className="fw-bold">Set Price ($)</label>
                <input
                  type="number"
                  name='price'
                  value={formDescription.price}
                  className="form-control mt-2"
                  placeholder="Enter price"
                  onChange={handleChangeDescription}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type='submit' className='w-25 mt-2' variant='primary'>
  Create Your Place
</Button>
            
          </div>

         

       </form>
        </div>
    </>
  )
}

export default Createlisting