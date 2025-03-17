// import React, { useState } from "react";
// import { Container, Card, Form, Button, Alert } from "react-bootstrap";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/admin/login", { email, password });
//       localStorage.setItem("adminToken", res.data.token);
//       navigate("/admin");
//     } catch (err) {
//       setError("Invalid Credentials");
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
//       <Card style={{ width: "400px" }} className="p-4">
//         <h3 className="text-center mb-3">Admin Login</h3>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleLogin}>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           </Form.Group>
//           <Button type="submit" variant="primary" className="w-100">Login</Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default AdminLogin;
