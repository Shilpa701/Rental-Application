import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../admin/Sidebar";
import SERVER_URL from "../services/serverURL";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/users/user`);
      if (!response.ok) throw new Error("Failed to fetch users");//  // API call
      const data = await response.json();
      setUsers(data); // Update state with user data
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
   
  



<Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar/>
        </Col>
        <Col md={9} className="p-3">
          <Card className="p-4">
          <div>
      <h2>Users</h2>
      {loading ? (
  <p>Loading...</p>
) : error ? (
  <p className="text-danger">{error}</p>
) : (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            
          </tr>
        </thead>
        <tbody>
        {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
        </tbody>
      </Table>
      )}
    </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
