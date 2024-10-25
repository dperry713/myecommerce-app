import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const CustomerDetail = ({ customerId, onDelete }) => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get(`/api/customers/${customerId}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/customers/${customerId}`);
      onDelete();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div>
      {customer ? (
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={customer.name} readOnly />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={customer.email} readOnly />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" name="phone" value={customer.phone} readOnly />
          </Form.Group>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Form>
      ) : (
        <p>Loading customer...</p>
      )}
    </div>
  );
};

export default CustomerDetail;

