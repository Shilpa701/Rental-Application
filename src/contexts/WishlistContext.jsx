import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (item) => {
    setWishlist((prev) => [...prev, item]);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.listingId !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);




// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   // ✅ Fetch wishlist from backend on load
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (token) {
//           const res = await axios.get("/api/wishlist", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setWishlist(res.data);
//         }
//       } catch (err) {
//         console.error("Failed to fetch wishlist:", err);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   // ✅ Add item to wishlist in backend + context
//   const addToWishlist = async (listingId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const res = await axios.post(
//           "/api/wishlist",
//           { listingId },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setWishlist((prev) => [...prev, res.data]); // ✅ Add to context state
//       }
//     } catch (err) {
//       console.error("Failed to add to wishlist:", err);
//     }
//   };

//   // ✅ Remove item from wishlist in backend + context
//   const removeFromWishlist = async (listingId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         await axios.delete(`/api/wishlist/${listingId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setWishlist((prev) =>
//           prev.filter((item) => item.listingId !== listingId)
//         );
//       }
//     } catch (err) {
//       console.error("Failed to remove from wishlist:", err);
//     }
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);


// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import SERVER_URL from "../services/serverURL";








// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

//   // ✅ Fetch wishlist on load
 
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const res = await axios.get("http://localhost:5000/wish", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log("Fetched Wishlist:", res.data);
//         setWishlist(res.data);
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//       }
//     };

//     fetchWishlist();
//   }, []);
  
  



  // const addToWishlist = async (listing) => {
  //   try {
  //     console.log("Adding to wishlist:", listing);
  
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       console.error("No token found");
  //       return;
  //     }
  
  //     const response = await axios.post(
  //       `${SERVER_URL}/wish/add`,
  //       { listingId: listing._id }, // ✅ Make sure to use the correct key
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  
  //     console.log("Added to wishlist:", response.data);
  
  //     setWishlist((prev) => [
  //       ...(prev || []).filter((item) => item.listingId !== null), // Remove invalid items
  //       response.data, // Add new valid item
  //     ]);   
  //    } catch (err) {
  //     console.error("Error adding to wishlist:", err);
  //     console.log(err.response?.data);
  //   }
  // };
  
  // const addToWishlist = async (listing) => {
  //   const token = localStorage.getItem("token");
  
  //   try {
  //     await axios.post(
  //       "http://localhost:5000/wish/add",
  //       {
  //         listingId: listing._id, // ✅ Send as string
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Error adding to wishlist:", error);
  //   }
  // };
  
  // const addToWishlist = async (listing) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;
  
  //     const response = await axios.post(
  //       `${SERVER_URL}/wish/add`,
  //       { listingId:listing._id },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  
  //     setWishlist((prev) => [
  //       ...prev,
  //       {
  //         _id: response.data._id,
  //         title: listing.title,
  //         city: listing.city,
  //         country: listing.country,
  //         price: listing.price,
  //         listingPhotoPaths: listing.listingPhotoPaths,
  //         booking: listing.booking,
  //       },
  //     ]);
  //   } catch (error) {
  //     console.error("Error adding to wishlist:", error);
  //   }
  // };
  
//   const addToWishlist = async (listing) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;
  
//       const response = await axios.post(
//         `${SERVER_URL}/wish/add`,
//         { listingId: listing._id }, // ✅ Correct key
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
  
//       setWishlist((prev) => [
//         ...prev,
//         {
//           _id: response.data._id, // ✅ Match backend key
//           title: listing.title,
//           city: listing.city,
//           country: listing.country,
//           price: listing.price,
//           listingPhotoPaths: listing.listingPhotoPaths,
//           booking: listing.booking,
//         },
//       ]);
  
//       // ✅ Optional: Show success feedback (like a toast)
//       alert("Added to wishlist!");
//     } catch (error) {
//       if (error.response?.status === 400) {
//         // ✅ Show alert if already in wishlist
//         alert("Already Existed")
//         // alert(error.response.data.message); // "Property already in wishlist"
//       } else {
//         console.error("Error adding to wishlist:", error);
//       }
//     }
//   };
  
  



//   const removeFromWishlist = async (listingId) => {
//     console.error("Invalid listingId:", listingId);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const res = await axios.delete(`${SERVER_URL}/wish/remove/${listingId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlist(res.data.wishlist);
//     } catch (err) {
//       console.error("Error removing from wishlist:", err);
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, addToWishlist, removeFromWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);