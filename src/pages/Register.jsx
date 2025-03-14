
// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SERVER_URL from '../services/serverURL';

const Register = () => {
  const [username,setUsername] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {      
      const response = await axios.post(`${SERVER_URL}/auth/register`, {
        username,
        email,
        password
      });      
      if (response.status === 201) {
        setMessage(response.data.message); 
        navigate('/generate-otp', { state: { email } });
      }
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  console.log(username,email,password);
  
  return (
    <div className="d-flex justify-content-center  p-5">
      <div className='p-4 shadow-lg  text-center' style={{ width: '400px', borderRadius: '10px' }}>
        <h2 className='text-center mb-4 fs-3'>Register</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label>Username:</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button className='mt-3 btn-primary' type="submit" >Register</button>
        </form>
        {message && <p>{message}</p>}
        <p>Already a User?<a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;



























// // src/components/Register.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { registerAPI } from '../services/allAPI';

// const Register = () => {
//   const [name,setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const reqBody = { name, email, password };
  
//     console.log("Register API Request:", reqBody);
  
//     try {
//       const response = await registerAPI(reqBody);
  
//       console.log("Registration Response:", response); // ✅ Debugging
  
//       if (response && response.success && response.userId) {
//         localStorage.setItem("userId", response.userId);
//         console.log("User ID Saved:", response.userId);
//         navigate('/send-verify-otp');
//       } else {
//         setMessage(response?.message || "Unexpected error occurred");
//       }
//     } catch (error) {
//       console.error("Registration Error:", error);
//       setMessage('Registration failed');
//     }
//   };
  
  

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//       <div className="form-group">
//           <label>Name:</label>
//           <input
//             type="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button  type="submit">Register</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Register;