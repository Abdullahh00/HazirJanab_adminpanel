import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col
} from "react-bootstrap";

function EditItem() {
    const location = useLocation();
    const history = useHistory();
  const [imageURL, setImageURL] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  //const location = useLocation();
  const [userData, setUserData] = useState({
    // Initialize with empty values or default values
    id:'',
    name: '',
    hourlyrate:'',
    description: '',
    city: '',
    category: '',
    type: '',
    image:'',
  });

  useEffect(() => {
    if (location.state && location.state.user) {
      const { id,name, hourlyrate,description, city, category, type, img } = location.state.user;
      // if (Array.isArray(Profile_pic) && Profile_pic.length > 0 && Profile_pic[0] instanceof Blob) {
      //   const objectURL = URL.createObjectURL(Profile_pic[0]);
      //   setImageURL(objectURL);
  
      //   // Revoke the object URL on cleanup
      //   return () => {
      //     URL.revokeObjectURL(objectURL);
      //   };
      // }
      setUserData({
        id: id,
        name: name,
        hourlyrate:hourlyrate,
        description: description, // Caution with password handling
        city: city, // Assuming this is a string or similar
        category: category,
        type: type,
        img:img,
      });
    }
  }, [location.state]);


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = userData.id;
  
    const updatedUserData = {
      id: userData.id,
      name: userData.name,
      hourlyrate:userData.hourlyrate,
      description: userData.description, // Caution with password handling
      city: userData.city, // Assuming this is a string or similar
      category: userData.category,
      type: userData.type,
      img:userData.img,
    };
  
    axios.put(`http://localhost:3001/hazirjanab/edititem/${userId}`, updatedUserData)
      .then(response => {
        // Handle the response from the server
        console.log(response.data);
        alert('item updated');

        history.push({
            pathname: '/admin/typography', // Pass user object in state
          });
        // Actions after successful update (e.g., redirect or display a success message)
      })
      .catch(error => {
        // Handle any errors here
        console.error("Error creating  user:", error);
        // Actions after error (e.g., display an error message)
      });
  };
  




  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Create item</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  {/* Existing Fields Updated with State */}
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>name</label>
                        <Form.Control
                          value={userData.name}
                          onChange={(e) => handleChange(e)}
                          name="name"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>hourly rate</label>
                        <Form.Control
                          value={userData.hourlyrate}
                          onChange={(e) => handleChange(e)}
                          name="hourlyrate"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
  
                  {/* Additional Fields */}
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>description</label>
                        <Form.Control
                          value={userData.description}
                          onChange={(e) => handleChange(e)}
                          name="description"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          value={userData.city}
                          onChange={(e) => handleChange(e)}
                          name="city"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                        <Form.Group>
                        <label>Category</label>
                        <Form.Control
                            value={userData.category}
                            onChange={(e) => handleChange(e)}
                            name="category"
                            type="text"
                        />
                        </Form.Group>
                    </Col>
                  </Row>

                  
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>type</label>
                        <Form.Control
                          value={userData.type}
                          onChange={(e) => handleChange(e)}
                          name="type"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  {/* Update Profile Button */}
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={handleSubmit}
                  >
                    Create new item 
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
  
          {/* User Profile Picture and Info */}
          {/* <Col md="4">
          <div className="card-image">
                  <img
                    alt="Profile"
                    src={imageURL || "default-image-url"} // Use the imageURL for the src
                  />
                </div>
          </Col> */}
        </Row>
      </Container>
    </>
  );
  
}

export default EditItem;
