import commonAPI from "./commonAPI";
import SERVER_URL from "../services/serverURL";


export const registerAPI = async (reqBody) => {
    const response = await commonAPI("POST", `${SERVER_URL}/auth/register`, reqBody);
    
    console.log("registerAPI Response:", response);  // ✅ Debugging

    return response;  // ✅ Ensure response is returned
};

export const loginAPI = async (reqBody) => {
    const response = await commonAPI("POST", `${SERVER_URL}/auth/login`, reqBody);
  
    if (response?.success && response?.token) {
      localStorage.setItem("token", response.token); // ✅ Save token
    }
  
    return response;
  };

export const logoutAPI = async () => {
    return await commonAPI("POST",`${SERVER_URL}/api/auth/logout`);
};


export const sendOtpAPI = async (email) => {
  const token = localStorage.getItem("token"); // 🔥 Retrieve stored token
  
  const response = await commonAPI("POST", `${SERVER_URL}/auth/send-verify-otp`, { email }, {
    Authorization: `Bearer ${token}`, // 🔥 Add token in headers
  });

  console.log("sendOtpAPI Response:", response); // ✅ Debugging

  return response;
};

// Verify OTP API
export const verifyOtpAPI = async (reqBody) => {
    return await commonAPI("POST",`${SERVER_URL}/api/auth/verify-account`, reqBody);
};


// export const isAuthenticatedAPI = async () => {
//     return await commonAPI("GET", ` ${SERVER_URL}/api/auth/is-auth`);
//   };


export const isAuthenticatedAPI = async () => {
  return await commonAPI("GET", `${SERVER_URL}/api/auth/is-auth, null`, { 
    Authorization: `Bearer ${token}`,
  });
};



export const addProjectAPI = async (reqBody,reqHeader)=>{

  return await commonAPI("POST",`${SERVER_URL}/properties/create`,reqBody,reqHeader)

} 




export const userProjectAPI = async (reqHeader)=>{

  return await commonAPI("GET",`${SERVER_URL}/${listingId}`,{},reqHeader)

}  