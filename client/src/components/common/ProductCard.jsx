import React from 'react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  // Handle different data structures between shop goods and shop items
  let displayName = 'Product';
  let alternateNames = [];

  if (Array.isArray(product.name) && product.name.length > 0) {
    displayName = product.name[0];
    alternateNames = product.name.slice(1);
  } else if (typeof product.name === 'string') {
    displayName = product.name;
  }

  // Use a default image if imageUrl is missing
  const imageUrl = product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image';

  // Handle different price properties (cost or price)
  const price = product.cost || product.price || 0;

  // Get category from product
  const category = product.category || 'uncategorized';

  // Handle missing quantity
  const quantity = product.quantity || 0;

  // Calculate discounted price (10-20% off original price)
  const discountPercent = [10, 15, 20][Math.floor(Math.random() * 3)];
  const originalPrice = price;
  const discountedPrice = price * (1 - discountPercent / 100);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative">
      {/* Product image */}
      <div className="relative h-48 overflow-hidden bg-gray-50 p-4 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={displayName}
          className="h-full object-contain transition-transform duration-300 hover:scale-105 mix-blend-multiply"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=Error+Loading+Image';
          }}
        />
      </div>

      {/* Product details */}
      <div className="p-3 flex flex-col flex-grow">
        <div className="mb-1">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{displayName}</h3>
          {alternateNames.length > 0 && (
            <p className="text-xs text-gray-500 line-clamp-1">{alternateNames.join(', ')}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-sm font-bold text-primary-custom">₹{Math.round(discountedPrice)}</span>
            <span className="text-xs text-gray-500 line-through ml-1">₹{Math.round(originalPrice)}</span>
          </div>

          <button
            className="bg-primary-custom hover:bg-opacity-90 text-white p-1.5 rounded-full transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              addToCart({...product, price: discountedPrice});
              console.log('Added to cart:', product);
            }}
            aria-label="Add to cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
