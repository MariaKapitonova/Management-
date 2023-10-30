import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const header = () => {
  return (
    <>
      <Navbar
        className="narvBarFixed"
        expand="lg"
        bg="success"
        data-bs-theme="dark"
      >
        <div className="headerPosition">
          <LinkContainer to="/">
            <Navbar.Brand>Management</Navbar.Brand>
          </LinkContainer>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="headerChildPosition">
              <LinkContainer to="/employees">
                <Nav.Link>Employees</Nav.Link>
              </LinkContainer>
            </div>
            <div className="headerChildPosition">
              <LinkContainer to="/tribes">
                <Nav.Link>Tribes</Nav.Link>
              </LinkContainer>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default header;
