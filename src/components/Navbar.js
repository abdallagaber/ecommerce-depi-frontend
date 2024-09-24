import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

const CustomNavbar = ({ isLoggedIn, onLogout }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">E-commerce</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/wishlist">
            <FaHeart /> Wishlist
          </Nav.Link>
          <Nav.Link href="/cart">
            <FaShoppingCart /> Cart
          </Nav.Link>
          {isLoggedIn ? (
            <Button variant="outline-danger" onClick={onLogout}>
              Sign Out
            </Button>
          ) : (
            <Button variant="outline-primary" href="/login">
              Login
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
