import React from 'react';

const CategoryItem = ({ image, title, onClick, index }) => {
  // Calculate animation delay based on index
  const animationDelay = `${index * 0.05}s`;

  return (
    <div
      className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105 group category-item-animation pulse-animation"
      onClick={onClick}
      style={{ animationDelay }}
    >
      <div className="mb-2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-primary-custom/20">
        <img
          src={image || `https://via.placeholder.com/80?text=${title}`}
          alt={title}
          className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
      <p className="text-xs text-center font-medium text-gray-800 w-full line-clamp-2 px-1 transition-colors duration-300 group-hover:text-primary-custom"
         style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
        {title}
      </p>
    </div>
  );
};

export default CategoryItem;
