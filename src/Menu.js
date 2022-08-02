import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'

export default function MenuComp() {
  return (
    <>
      <Navbar bg="primary" expand="sm" variant="dark">
      <Container>
        <LinkContainer to="/ReactShopProject"><Navbar.Brand>Dor's Shop</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/Products"><Nav.Link>Products</Nav.Link></LinkContainer>
            <LinkContainer to="/Customers"><Nav.Link>Customers</Nav.Link></LinkContainer>
            <LinkContainer to="/Purchases"><Nav.Link>Purchases</Nav.Link></LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <br />
    </>
  );
}