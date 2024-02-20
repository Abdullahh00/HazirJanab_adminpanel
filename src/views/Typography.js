import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FaEdit, FaTrash,FaPlus } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';



// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";



 

function Typography() {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  function fetchUsers() {
    axios.get('http://localhost:3001/hazirjanab/getitems')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);
  

  function handleEditClick(user) {
    history.push({
      pathname: '/admin/edititem',
      state: { user: user } // Pass user object in state
    });
    // Logic to handle edit
    //console.log("Edit clicked for user:", userId);
  }
  
  function handleDeleteClick(userId) {
    axios.delete(`http://localhost:3001/hazirjanab/deleteitem/${userId}`)
      .then(response => {
        // Handle the response, such as updating the UI or showing a success message
        console.log("User deleted successfully:", response.data);
        // Optionally, refresh the users list to reflect the deletion
        fetchUsers();
      })
      .catch(error => {
        // Handle any errors here
        console.error("Error deleting user:", error);
      });
  }
  

  function handleCreateNewUser(userId) {
    // Logic to handle delete
    history.push({
      pathname: '/admin/createitem', // Pass user object in state
    });
  }
  


  //className="strpied-tabled-with-hover"
  return (
    
    <>
    
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
            <Card.Header>
           

  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div>
      <Card.Title as="h4"> Manage items</Card.Title>
      
    </div>
    <Button variant="primary" onClick={handleCreateNewUser}>
    <FaPlus /> Create New Item
    </Button>
  </div>
  
</Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Category</th>
                      <th className="border-0">Hourly Rate</th>
                      <th className="border-0">Actions</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}  </td>
                        <td>{user.category}</td>
                        <td>{user.hourlyrate}</td>
                        <td>
                              <FaEdit
                                className="edit-icon"
                                style={{ color: 'green', cursor: 'pointer' }}
                                onClick={() => handleEditClick(user)}
                              />
                              <FaTrash
                                className="delete-icon"
                                style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                                onClick={() => handleDeleteClick(user.id)}
                              />
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Typography;
