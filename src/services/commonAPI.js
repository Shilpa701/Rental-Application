// import axios from "axios";

// const commonAPI = async (method, url, data = null) => {
//   try {
//     const token = localStorage.getItem("token"); // 🔑 Get token

//     const response = await axios({
//       method,
//       url,
//       data,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token ? `Bearer ${token}` : "", // ✅ Include token
//       },
//     });

//     console.log("API Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error:", error.response ? error.response.data : error.message);
//     return error.response ? error.response.data : { success: false, message: "Server error" };
//   }
// };

// export default commonAPI;
import axios from "axios";
import SERVER_URL from "../services/serverURL";


axios.defaults.baseURL = `${SERVER_URL}`; // ✅ Set base URL

const commonAPI = async (method, url, data = null) => {
  try {
    console.log("API Request:", method, url, data); // ✅ Debugging log
    
    const headers = {
      "Content-Type": "application/json",
    };

    const config = { method, url, headers, ...(data && { data }) };

    const response = await axios(config);

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response ? error.response.data : error.message);
    
    return { success: false, message: error.response?.data?.message || "Server error" };
  }
};

export default commonAPI;

