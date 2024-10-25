import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerForm from '../components/CustomerForm.jsx';
import CustomerDetail from '../components/CustomerDetail.jsx';

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('/api/customers');
      setCustomers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading customers...</div>;
  }

  return (
    <div>
      <h1>Customers</h1>
      <button onClick={() => setSelectedCustomerId(null)}>New Customer</button>
      {selectedCustomerId ? (
        <CustomerDetail customerId={selectedCustomerId} onDelete={() => setSelectedCustomerId(null)} />
      ) : (
        <div>
          {customers.length === 0 ? (
            <p>No customers found</p>
          ) : (
            customers.map(customer => (
              <div key={customer.id}>
                {customer.name}
                <button onClick={() => setSelectedCustomerId(customer.id)}>Details</button>
              </div>
            ))
          )}
        </div>
      )}
      <CustomerForm onSubmit={(newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setSelectedCustomerId(newCustomer.id);
      }} />
    </div>
  );
};

export default CustomerPage;
