import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <>
      <div className="center-table">
        <Spinner animation="grow" variant="success" size="sl"></Spinner>
        <Spinner animation="grow" variant="warning" size="sl"></Spinner>
        <Spinner animation="grow" variant="primary" size="sl"></Spinner>
      </div>
    </>
  );
}

export default LoadingSpinner;
