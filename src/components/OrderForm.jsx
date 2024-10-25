import React from 'react';
import { Button, Form } from 'react-bootstrap';
import useForm from '../hooks/useForm';
import apiClient from '../utils/api';

const OrderForm = ({ onSubmit }) => {
  const initialValues = {
    customerId: '',
    products: []
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(initialValues);

  const submitOrder = async (formData) => {
    try {
      const response = await apiClient.post('/orders', formData);
      onSubmit(response.data);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(submitOrder);
    }}>
      <Form.Group controlId="customerId">
        <Form.Label>Customer ID</Form.Label>
        <Form.Control
          type="text"
          name="customerId"
          value={values.customerId}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!errors.customerId}
        />
        <Form.Control.Feedback type="invalid">
          {errors.customerId}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit">Submit Order</Button>
    </Form>
  );
};

export default OrderForm;
