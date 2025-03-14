import Navbar from "../components/Header";
import ListingCard from "../components/ListingCard.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { useWishlist } from "../contexts/WishlistContext.jsx";

const WishList = () => {
  const { wishlist } = useWishlist();

  return (
    <>
      <Navbar />
      <Container>
        <h1 className="text-center my-5">Your Wish List</h1>
        <Row>
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <Col key={item.listingId} md={4} sm={6} className="mb-4">
                <ListingCard {...item} />
              </Col>
            ))
          ) : (
            <p className="text-center">No items in your wishlist.</p>
          )}
        </Row>
      </Container>
    
    </>
  );
};

export default WishList;
// import { useWishlist } from "../contexts/WishlistContext";

// const WishList = () => {
//   const { wishlist } = useWishlist();

//   return (
//     <>
//       <h1>Your Wish List</h1>
//       {wishlist.length > 0 ? (
//         wishlist.map((item) => (
//           <div key={item._id}>{item.title}</div>
//         ))
//       ) : (
//         <p>No items in your wishlist.</p>
//       )}
//     </>
//   );
// };
// export default WishList;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Header";
// import ListingCard from "../components/ListingCard.jsx";
// import { Container, Row, Col } from "react-bootstrap";

// const WishList = () => {
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const token = localStorage.getItem("token"); // ✅ Get token from localStorage
//         if (!token) return;

//         const res = await axios.get("/api/wishlist", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setWishlist(res.data); // ✅ Store fetched wishlist in state
//       } catch (err) {
//         console.error("Error fetching wishlist:", err);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <Container>
//         <h1 className="text-center my-5">Your Wish List</h1>
//         <Row>
//           {wishlist.length > 0 ? (
//             wishlist.map((item) => (
//               <Col key={item._id} md={4} sm={6} className="mb-4">
//                 <ListingCard {...item} />
//               </Col>
//             ))
//           ) : (
//             <p className="text-center">No items in your wishlist.</p>
//           )}
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default WishList;
// import Navbar from "../components/Header";
// import ListingCard from "../components/ListingCard.jsx";
// import { Container, Row, Col } from "react-bootstrap";
// import { useWishlist } from "../contexts/WishlistContext.jsx";

// const WishList = () => {
//   const { wishlist } = useWishlist();



//   console.log("Wishlist Data:", wishlist);

//   return (
//     <>
//       <Navbar />
//       <Container>
//         <h1 className="text-center my-5">Your Wish List</h1>
//          <Row>
         {/* {wishlist.length > 0 ? (
            wishlist.map((item) =>
              item?.listingId ? ( // ✅ Ensure listingId is not null
                <Col key={item._id} md={4} sm={6} className="mb-4">
                  <ListingCard
                    listingId={item.listingId._id}
                    listingPhotoPaths={item.listingId.listingPhotoPaths
                    }
                    city={item.listingId.city}
                    country={item.listingId.country}
                    category={item.listingId.category}
                    type={item.listingId.type}
                    price={item.listingId.price}
                    booking={item.listingId.booking}
                  />
                </Col>
              ) : null
            )
          ) : (
            // <p className="text-center">No items in your wishlist.</p>
          )} */}


// {wishlist.length > 0 ? (
//   wishlist.map((item) =>
//     item?.listingId ? (
//       <Col key={item._id} md={4} sm={6} className="mb-4">
//         <ListingCard
//           listingId={item.listingId._id} // ✅ Avoid naming conflict
//           listingPhotoPaths={item.listingId.listingPhotoPaths || []}
//           city={item.listingId.city || "N/A"}
//           country={item.listingId.country || "N/A"}
//           category={item.listingId.category || "N/A"}
//           type={item.listingId.type || "N/A"}
//           price={item.listingId.price || 0}
//           booking={item.listingId.booking || "N/A"}
        

//         />
//       </Col>
//     ) : null
//   )
// ) : (
//   <p className="text-center">No items in your wishlist.</p>
// )}







//         </Row>
//       </Container>
//     </>
//   );
// };

// export default WishList;


// import { useWishlist } from "../contexts/WishlistContext";
// // import Navbar from "../components/Header";


// const Wishlist = () => {
//   const { wishlist } = useWishlist();

//   return (
//     <>
//        <Navbar />
//     <div>
//       <h2>My Wishlist</h2>
//       {wishlist.length === 0 ? (
//         <p>No items in wishlist</p>
//       ) : (
//         <div className="wishlist-container">
//           {wishlist.map((item) => (
//             <div key={item.id} className="wishlist-card">
//               <img src={item.image} alt={item.title} />
//               <h3>{item.title}</h3>
//               <p>{item.city}</p>
//               <p>${item.price}/night</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Wishlist;


