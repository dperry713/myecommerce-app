import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ProductDetail = ({ productId, onDelete }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/products/${productId}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      {product ? (
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={product.name} readOnly />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={product.price} readOnly />
          </Form.Group>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Form>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default ProductDetail;

