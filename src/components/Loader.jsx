import { Spinner } from "react-bootstrap";
// import "../styles/Loader.scss";

const Loader = () => {
  return (
    <div className="loader d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
 