import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CustomerForm = ({ onSubmit }) => {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/customers', customer);
      onSubmit(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={customer.name} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={customer.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="phone" value={customer.phone} onChange={handleChange} required />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default CustomerForm;

