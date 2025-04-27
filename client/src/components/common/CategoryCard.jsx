import React from 'react';

const CategoryCard = ({ image, title, onClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="bg-gray-50 rounded-full p-2 mb-2 w-[70px] h-[70px] flex items-center justify-center overflow-hidden shadow-sm">
        <img
          src={image}
          alt={title}
          className="w-[50px] h-[50px] object-contain"
        />
      </div>
      <p className="text-xs text-center font-medium text-gray-800 max-w-[80px] leading-tight">
        {title}
      </p>
    </div>
  );
};

export default CategoryCard;
