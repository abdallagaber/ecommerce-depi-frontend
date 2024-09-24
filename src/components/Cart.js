import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Cart = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(
            `http://localhost:5000/api/cart/${user.id}`
          );
          setCartItems(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [user]);

  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/cart/${user.id}/${productId}`
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  if (!user) {
    return <p>Please log in to view your cart.</p>;
  }

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <Container className="mt-4">
      <h2>Your Cart</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {cartItems.map((item) => (
          <Col key={item.productId._id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={item.productId.imageUrl}
                alt={item.productId.name}
                style={{ height: "150px", objectFit: "cover" }} // Adjust height and fit
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>
                  {item.productId.name}
                </Card.Title>
                <Card.Text style={{ fontSize: "0.9rem" }}>
                  Price: ${item.productId.price}
                </Card.Text>
                <Card.Text style={{ fontSize: "0.9rem" }}>
                  Quantity: {item.quantity}
                </Card.Text>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.productId._id)}
                >
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cart;
