// import React, { useState } from "react";
// import { Card, ListGroup, Form, Button } from "react-bootstrap";

// const Review = ({ reviews, onSubmitReview }) => {
//   const [reviewText, setReviewText] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (reviewText.trim()) {
//       onSubmitReview(reviewText);
//       setReviewText("");
//     }
//   };

//   return (
//     <Card className="mt-4">
//       <Card.Header as="h5">Reviews</Card.Header>
//       <ListGroup variant="flush">
//         {reviews.map((review, index) => (
//           <ListGroup.Item key={index}>
//             <strong>{review.userName}</strong>
//             <p>{review.comment}</p>
//             <small>{new Date(review.date).toLocaleDateString()}</small>
//           </ListGroup.Item>
//         ))}
//       </ListGroup>

//       <Card.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="reviewForm">
//             <Form.Label>Leave a Review</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               placeholder="Write your review here..."
//               required
//             />
//           </Form.Group>
//           <Button variant="primary" type="submit" className="mt-2">
//             Submit Review
//           </Button>
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Review;

// import { useState, useEffect } from "react";
// import { Form, Button, ListGroup } from "react-bootstrap";
// import axios from "axios";
// import SERVER_URL from "../services/serverURL";
// import { useAuth } from "../contexts/AuthContextAPI";

// const Review = ({ listingId }) => {
//   const { isAuthenticated, userId, userName } = useAuth();
//   console.log("User ID:", userId);
// console.log("User Name:", userName); // Add this to debu
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${SERVER_URL}/api/reviews/${listingId}`);
//         setReviews(response.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
//       } catch (error) {
//         console.error("Failed to fetch reviews:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [listingId]);

  
//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log("Submitting review for listingId:", listingId); // Debug log

//   if (!reviewText.trim()) {
//     alert("Please enter a review");
//     return;
//   }

//   if (!isAuthenticated) {
//     alert("Please log in to leave a review");
//     return;
//   }

//   setSubmitting(true);
//   try {
//     const response = await axios.post(`${SERVER_URL}/api/reviews`, {
//       listingId, // Ensure this is passed
//       userId,
//       userName,
//       comment: reviewText,
//     });

//     setReviews((prev) =>
//       [response.data, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
//     );
//     setReviewText("");
//   } catch (error) {
//     console.error("Failed to submit review:", error);
//     alert("Failed to submit review");
//   } finally {
//     setSubmitting(false);
//   }
// };


//   return (
//     <div>
//       <h2 className="fw-bolder">Reviews</h2>
//       <ListGroup className="mb-3">
//         {loading ? (
//           <p>Loading reviews...</p>
//         ) : reviews.length > 0 ? (
//           reviews.map((review) => (
//             <ListGroup.Item key={review._id}>
//               <strong>{review.userName}</strong>
//               <p>{review.comment}</p>
//               <small className="text-muted">
//                 {review.date ? new Date(review.date).toLocaleDateString() : "No date available"}
//               </small>
//             </ListGroup.Item>
//           ))
//         ) : (
//           <p>No reviews yet. Be the first to leave a review!</p>
//         )}
//       </ListGroup>

//       {isAuthenticated ? (
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-2">
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               placeholder="Leave a review..."
//             />
//           </Form.Group>
//           <Button type="submit" variant="primary" className="w-100" disabled={submitting}>
//             {submitting ? "Submitting..." : "Submit Review"}
//           </Button>
//         </Form>
//       ) : (
//         <p className="text-danger">Please log in to leave a review.</p>
//       )}
//     </div>
//   );
// };

// export default Review;



import { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import axios from "axios";
import SERVER_URL from "../services/serverURL";
import { useAuth } from "../contexts/AuthContextAPI";

const Review = ({ listingId }) => {
  const { isAuthenticated, userId, userName } = useAuth();
  console.log("User ID:", userId);
  console.log("User Name:", userName);

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(5); // Show 5 reviews initially

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${SERVER_URL}/api/reviews/${listingId}`);
        const sortedReviews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReviews(sortedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [listingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting review for listingId:", listingId);

    if (!reviewText.trim()) {
      alert("Please enter a review");
      return;
    }

    if (!isAuthenticated) {
      alert("Please log in to leave a review");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(`${SERVER_URL}/api/reviews`, {
        listingId,
        userId,
        name: userName,
        comment: reviewText,
      });
      console.log("Fetching reviews for listingId:", listingId);
      setReviews((prev) =>
        [response.data, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date))
      );
      setReviewText("");
      setVisibleReviews((prev) => prev + 1); // Show the new review immediately
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="fw-bolder">Reviews</h2>
      <ListGroup className="mb-3">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.slice(0, visibleReviews).map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <p>{review.comment}</p>
              <small className="text-muted">
                {review.date ? new Date(review.date).toLocaleDateString() : "No date available"}
              </small>
            </ListGroup.Item>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </ListGroup>

      {/* View More Button */}
      {visibleReviews < reviews.length && (
        <Button variant="outline-primary" className="w-100 mb-3" onClick={() => setVisibleReviews((prev) => prev + 5)}>
          View More
        </Button>
      )}

      {isAuthenticated ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Leave a review..."
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Form>
      ) : (
        <p className="text-danger">Please log in to leave a review.</p>
      )}
    </div>
  );
};

export default Review;


