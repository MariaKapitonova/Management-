import Container from "react-bootstrap/Container";
import logo from "../../../public/frog.svg";
import "../../style.css";

function MainPage() {
  return (
    <>
      <Container>
        <div className="center-item">
          <h1> Welcome to main page!</h1>
          <img width="200" height="200" src={logo}></img>
        </div>
      </Container>
    </>
  );
}

export default MainPage;
