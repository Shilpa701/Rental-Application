import React from 'react'

const Requestotp = () => {
  return (
    <div>Requestotp</div>
  )
}

export default Requestotp
























// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { sendOtpAPI } from "../services/allAPI";

// const Requestotp = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();


//   const requestOtp = async () => {
//     if (!email.trim()) {
//       setMessage("Please enter your email.");
//       return;
//     }
  
//     try {
//       const response = await sendOtpAPI(email);
  
//       if (response?.success) {
//         localStorage.setItem("otpToken", response.token); // Store temporary token
//         localStorage.setItem("userEmail", email);
//         setMessage("OTP sent to your email.");
//         setTimeout(() => navigate("/verify-account"), 2000);
//       } else {
//         setMessage(response?.message || "Failed to send OTP. Try again.");
//       }
//     } catch (error) {
//       console.error("OTP Request Error:", error);
//       setMessage("Failed to send OTP. Please try again later.");
//     }
//   };

//   return (
//     <div className="request-otp-container">
//       <h2>Request OTP</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />
//       <button onClick={requestOtp}>Send OTP</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default Requestotp;
