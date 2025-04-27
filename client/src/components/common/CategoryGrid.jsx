import React, { useRef } from 'react';
import CategoryItem from './CategoryItem';

const CategoryGrid = ({ categories, onCategoryClick }) => {
  const scrollContainerRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-white py-6 border-b border-gray-100 relative">
      <div className="container mx-auto px-4 mb-4">
        <h2 className="text-lg font-bold text-gray-800" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          Shop by Category
        </h2>
      </div>

      {/* Left scroll button */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-custom/30 hidden md:block"
        onClick={scrollLeft}
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div className="container mx-auto px-4 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 md:space-x-8 overflow-x-auto scrollbar-hide py-2 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              index={index}
              image={category.image}
              title={category.title}
              onClick={() => onCategoryClick(category.id || category.title.toLowerCase())}
            />
          ))}
        </div>
      </div>

      {/* Right scroll button */}
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-custom/30 hidden md:block"
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CategoryGrid;
