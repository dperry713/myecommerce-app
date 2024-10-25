import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm.jsx';
import ProductDetail from '../components/ProductDetail.jsx';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      <button onClick={() => setSelectedProductId(null)}>New Product</button>
      {selectedProductId ? (
        <ProductDetail productId={selectedProductId} onDelete={() => setSelectedProductId(null)} />
      ) : (
        <div>
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map(product => (
              <div key={product.id}>
                {product.name}
                <button onClick={() => setSelectedProductId(product.id)}>Details</button>
              </div>
            ))
          )}
        </div>
      )}
      <ProductForm onSubmit={(newProduct) => {
        setProducts([...products, newProduct]);
        setSelectedProductId(newProduct.id);
      }} />
    </div>
  );
};

export default ProductPage;
