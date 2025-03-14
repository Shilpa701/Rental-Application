import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SERVER_URL from "../services/serverURL";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(`${SERVER_URL}/auth/login`, {
            email,
            password,
        });

        if (response.status === 200) {
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setMessage("Login successful!");

            // Redirect based on role
            if (user.role === "User") {
              navigate("/home");
              // Redirect to admin panel
            } else {
                 // Redirect to user home page
                 navigate("/admin");
            }
        }
    } catch (error) {
        setMessage("Invalid email or password");
    }
};



  return (
    <div  className="d-flex justify-content-center  p-5">
     <div  className='p-4 shadow-lg  text-center' style={{ width: '400px', borderRadius: '10px' }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className='mt-3 btn-primary' type="submit">Login</button>
        </form>
        {message && <p>{message}</p>} 

        <p>new User register here <Link to="/register">Register</Link>
        </p>
     </div>
    </div>
  );
};

export default Login;
