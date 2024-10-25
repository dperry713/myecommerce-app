import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ProductForm = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    price: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', product);
      onSubmit(product);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={product.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default ProductForm;

