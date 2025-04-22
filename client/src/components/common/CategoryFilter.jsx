import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide py-1">
      <div className="flex pb-0 pl-2 pr-6">
        {categories.map((category, index) => (
          <button
            key={category.id}
            className={`px-4 py-3 transition-all duration-300 whitespace-nowrap font-medium text-sm
              ${activeCategory === category.id
                ? 'active text-primary-custom border-b-2 border-primary-custom'
                : 'text-gray-600 hover:text-primary-custom'}
              filter-button flex items-center justify-center mx-3`}
            onClick={() => onCategoryChange(category.id)}
            style={{
              fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif',
              '--index': index
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center mr-2 icon-container">
              <span className="text-lg">{category.icon}</span>
            </div>
            <span className="whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
