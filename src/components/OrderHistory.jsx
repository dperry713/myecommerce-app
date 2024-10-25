import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = ({ customerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, [customerId]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/orders?customerId=${customerId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order ID: {order.id}, Date: {order.date}
            {/* Add products list */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;

