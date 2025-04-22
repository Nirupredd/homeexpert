import React from 'react';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const CategorySection = ({ title, products, viewAllLink }) => {
  // Check if products is valid and has items
  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  // Filter out any invalid products (missing required fields)
  const validProducts = products.filter(product => {
    return product && (product.name || product.imageUrl || product.cost || product.price);
  });

  if (validProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-primary-custom pl-3"
            style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          {title}
        </h2>
        <Link
          to={viewAllLink.startsWith('/category/')
            ? `/products?category=${viewAllLink.split('/').pop()}`
            : viewAllLink}
          className="text-primary-custom font-medium flex items-center nav-link transition-all duration-300 hover:text-primary-custom/80 hover:translate-x-1"
          style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {validProducts.slice(0, 4).map((product, index) => (
          <ProductCard key={product._id || `product-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
