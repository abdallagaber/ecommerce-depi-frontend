// src/components/Login.js
import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Change this line

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Change this line

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      const loggedInUser = {
        id: response.data._id,
        name: response.data.name,
        email: response.data.email,
      };
      console.log("User being passed to onLogin:", loggedInUser);

      onLogin(loggedInUser); // Assuming the response contains user data
      navigate("/"); // Change this line
    } catch (error) {
      console.error("There was an error logging in!", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <p className="mt-3">
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </Container>
  );
};

export default Login;
