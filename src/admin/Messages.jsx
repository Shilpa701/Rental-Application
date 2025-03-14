import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../admin/Sidebar";
import SERVER_URL from "../services/serverURL";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/test/all-feedback`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Function to update feedback status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${SERVER_URL}/test/update-feedback-status/${id}?status=${status}`);
      fetchMessages(); // Refresh messages after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Function to delete a message
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/test/delete-feedback/${id}`);
      fetchMessages(); // Refresh messages after deletion
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9} className="p-3">
          <Card className="p-4">
            <h2 className="text-dark">Messages</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <tr key={msg._id}>
                      <td>{index + 1}</td>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.message}</td>
                      <td>
                        <span className={`badge ${msg.status === "Approved" ? "bg-success" : msg.status === "Rejected" ? "bg-danger" : "bg-warning"}`}>
                          {msg.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button variant="success" onClick={() => updateStatus(msg._id, "Approved")}>
                            <i className="fa-solid fa-check"></i>
                          </Button>
                          <Button variant="danger" onClick={() => updateStatus(msg._id, "Rejected")}>
                            <i className="fa-solid fa-x"></i>
                          </Button>
                
                        </div>

                      </td>
                      <td>
                      <Button variant="danger" onClick={() => deleteMessage(msg._id)}>
                            <i className="fa-solid fa-trash"></i>
                          </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No messages found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Messages;

