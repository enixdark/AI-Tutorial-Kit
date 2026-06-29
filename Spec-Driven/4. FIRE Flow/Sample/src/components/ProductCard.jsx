import React from 'react';
import './ProductCard.css';

const ProductCard = ({ inventory }) => {
  const isOdd = inventory % 2 === 1;

  return (
    <div className="product-card">
      <div className="product-header">
        <h2>Product</h2>
        {isOdd && (
          <div className="status-badge">Status: Active</div>
        )}
      </div>
      <div className="product-content">
        <p>Inventory Count: {inventory}</p>
      </div>
    </div>
  );
};

export default ProductCard;
