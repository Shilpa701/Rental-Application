import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import commonAPI from "../services/commonAPI";
import SERVER_URL from "../services/serverURL";

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  
  const location = useLocation();
  let email = location.state?.email;
 
  const navigate = useNavigate();  
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    console.log("Email Sent:", email);
    console.log("OTP Entered:", otp);

    try {
        const response = await axios.post(`${SERVER_URL}/auth/verify-otp`, {
            email,
            otp
        });

        if (response.status === 200) {
            console.log("OTP Verified Successfully");
            navigate("/login");
        } else {
            console.log("OTP Verification Failed:", response.data.message);
            setMessage(response.data.message || "Failed to verify OTP");
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        setMessage(error.response?.data?.message || "An error occurred while verifying OTP.");
    }
};

  //  const handleVerifyOtp = async (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email);
    
  //   try {
  //     const response = await axios.post("http://localhost:5000/auth/verify-otp", {
  //       email,
  //       otp,
  //     });

  //     setMessage(response.data.message);

  //     if (response.status === 200) {
  //       console.log("OTP Verified Successfully");
        
  //       // Navigate to home page after successful verification
  //       navigate("/login");  
  //     }
  //   } catch(err){
  //    console.log(err);
     
  //   }
  // };
  // const handleVerifyOtp = async (e) => {
  //   e.preventDefault();
  
  //   console.log("Email:", email, "Entered OTP:", otp);
  
  //   const response = await commonAPI("POST", "/auth/verify-otp", { email, otp });
  
  //   if (response.success) {
  //     console.log("OTP Verified Successfully");
  //     navigate("/login");
  //   } else {
  //     setMessage(response.message || "Failed to verify OTP");
  //   }
  // };


//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
  
//     console.log("Email:", email, "Entered OTP:", otp);
  
//     const response = await commonAPI("POST", "/auth/verify-otp", { email, otp });
  
//     if (!response) {
//       console.error("No response from API");
//       setMessage("Server error. Please try again.");
//       return;
//     }
//     console.log("Email Sent:", email); 
// console.log("OTP Entered:", otp);
  
//     if (response.success) {
//       console.log("OTP Verified Successfully");
//       navigate("/login");
//     } else {
//       console.log("OTP Verification Failed:", response.message);
//       setMessage(response.message || "Failed to verify OTP");
//     }
//   };

  

  return (
    <div className="verify-otp-form">
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <div className="form-group">
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button className='mt-3 btn-primary' type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
