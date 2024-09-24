// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spinner, Button } from "react-bootstrap";
import axios from "axios";

const ProductList = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cart/${user.id}`,
        {
          productId,
          quantity: 1,
        }
      );
      console.log(response.data.message);
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/wishlist/${user.id}`,
        {
          productId,
        }
      );
      alert("Product added to wishlist:", response.data);
      // Optionally show a success message or update the UI
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Check for specific error message from backend
        if (error.response.data.message === "Product already in wishlist") {
          alert("This product is already in your wishlist.");
        } else {
          alert(
            "Error adding product to wishlist: " + error.response.data.message
          );
        }
      } else {
        console.error("Error adding to wishlist:", error);
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <Row>
      {products.map((product) => (
        <Col key={product._id} sm={12} md={6} lg={4}>
          <Card className="mb-4">
            <Card.Img variant="top" src={product.imageUrl} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>${product.price}</Card.Text>
              <Button variant="primary" onClick={() => addToCart(product._id)}>
                Add to Cart
              </Button>
              <Button
                variant="outline-danger"
                className="ml-2"
                onClick={() => addToWishlist(product._id)}
              >
                Add to Wishlist
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
