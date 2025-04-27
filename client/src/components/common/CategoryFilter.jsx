import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide py-1">
      <div className="flex pb-0 pl-2 pr-6 md:justify-center">
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={`px-2 md:px-4 py-2 md:py-3 transition-all duration-300 whitespace-nowrap font-medium text-xs md:text-sm
              ${activeCategory === category.id
                ? 'active text-primary-custom border-b-2 border-primary-custom'
                : 'text-gray-600 hover:text-primary-custom'}
              filter-button flex items-center justify-center mx-1 md:mx-3`}
            onClick={() => onCategoryChange(category.id)}
            style={{
              fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif',
              '--index': index
            }}
          >
            <div className="w-5 h-5 md:w-6 md:h-6 flex items-center justify-center mr-1 md:mr-2 icon-container">
              <span className="text-base md:text-lg">{category.icon}</span>
            </div>
            <span className="whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
