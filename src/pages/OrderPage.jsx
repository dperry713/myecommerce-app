import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from '../components/OrderForm.jsx';
import OrderHistory from '../components/OrderHistory.jsx';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div>
      <h1>Orders</h1>
      <button onClick={() => setSelectedCustomerId(null)}>New Order</button>
      {selectedCustomerId ? (
        <OrderHistory customerId={selectedCustomerId} />
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map(order => (
              <div key={order.id}>
                Order ID: {order.id}, Date: {order.date}
              </div>
            ))
          )}
        </div>
      )}
      <OrderForm onSubmit={(newOrder) => {
        setOrders([...orders, newOrder]);
        setSelectedCustomerId(newOrder.customerId);
      }} />
    </div>
  );
};

export default OrderPage;
