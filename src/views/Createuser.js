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

function CreateUser() {
    const history = useHistory();
  const [imageURL, setImageURL] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  //const location = useLocation();
  const [userData, setUserData] = useState({
    // Initialize with empty values or default values
    id:'',
    firstName: '',
    lastName: '',
    password:'',
    email: '',
    profilePic: '',
    address: '',
    phoneNumber: '',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== passwordConfirm) {
        alert("Passwords do not match!");
        return; // Prevent form submission
      }
  
    const updatedUserData = {
      First_name: userData.firstName,
      Last_name: userData.lastName,
      Email: userData.email,
      Password: userData.password, // Caution with password handling
      Profile_pic: userData.profilePic, // Assuming this is a string or similar
      address: userData.address,
      phone_number: userData.phoneNumber,
    };
  
    axios.post(`http://localhost:3001/hazirjanab/createuser`, updatedUserData)
      .then(response => {
        // Handle the response from the server
        console.log(response.data);
        alert('user created');

        history.push({
            pathname: '/admin/table', // Pass user object in state
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
                <Card.Title as="h4">Create user</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  {/* Existing Fields Updated with State */}
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          value={userData.firstName}
                          onChange={(e) => handleChange(e)}
                          name="firstName"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          value={userData.lastName}
                          onChange={(e) => handleChange(e)}
                          name="lastName"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
  
                  {/* Additional Fields */}
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          value={userData.email}
                          onChange={(e) => handleChange(e)}
                          name="email"
                          type="email"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          value={userData.password}
                          onChange={(e) => handleChange(e)}
                          name="password"
                          type="password"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                        <Form.Group>
                        <label>Confirm Password</label>
                        <Form.Control
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            name="passwordConfirm"
                            type="password"
                        />
                        </Form.Group>
                    </Col>
                  </Row>

                  
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          value={userData.address}
                          onChange={(e) => handleChange(e)}
                          name="address"
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Phone Number</label>
                        <Form.Control
                          value={userData.phoneNumber}
                          onChange={(e) => handleChange(e)}
                          name="phoneNumber"
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
                    Create new user 
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

export default CreateUser;
