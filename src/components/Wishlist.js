import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const Wishlist = ({ user }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (user && user.id) {
          const response = await axios.get(
            `http://localhost:5000/api/wishlist/${user.id}`
          );
          setWishlistItems(response.data.products); // Assuming products are stored in the `products` field
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [user]);

  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/wishlist/${user.id}/${productId}`
      );
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.productId._id !== productId)
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  if (!user) {
    return <p>Please log in to view your wishlist.</p>;
  }

  if (wishlistItems.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <Container className="mt-4">
      <h2>Your Wishlist</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {wishlistItems.map((item) => (
          <Col key={item.productId._id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={item.productId.imageUrl}
                alt={item.productId.name}
                style={{ height: "150px", objectFit: "cover" }}
              />{" "}
              {/* Display product image with smaller height */}
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>
                  {item.productId.name}
                </Card.Title>
                <Card.Text style={{ fontSize: "0.9rem" }}>
                  Price: ${item.productId.price}
                </Card.Text>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.productId._id)}
                >
                  Remove from Wishlist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Wishlist;
