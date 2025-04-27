import React from 'react';

const GroceryBagImage = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="bg-[#f8f0ff] w-full h-full rounded-lg flex flex-col items-center justify-center">
        <div className="relative w-3/4">
          {/* Shopping Bag */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" className="w-full">
            {/* Bag */}
            <path d="M40,60 L160,60 L180,220 L20,220 Z" fill="#8a4af3" stroke="#8a4af3" strokeWidth="4"/>
            <path d="M50,60 L150,60 L165,210 L35,210 Z" fill="white"/>

            {/* Bag Handles */}
            <path d="M50,60 Q50,20 100,20 Q150,20 150,60" fill="none" stroke="#8a4af3" strokeWidth="8" strokeLinecap="round"/>

            {/* Grocery Items */}
            {/* Red Circle (Tomato) */}
            <circle cx="80" cy="90" r="20" fill="#ff5252"/>

            {/* Yellow Circle (Lemon) */}
            <circle cx="120" cy="90" r="20" fill="#ffeb3b"/>

            {/* Green Oval (Cucumber) */}
            <ellipse cx="100" cy="130" rx="30" ry="15" fill="#4caf50"/>

            {/* Red Circle (Tomato) */}
            <circle cx="120" cy="170" r="15" fill="#f44336"/>

            {/* Shopping List */}
            <rect x="170" y="100" width="30" height="70" rx="5" ry="5" fill="white" stroke="#8a4af3" strokeWidth="2"/>
            <line x1="175" y1="115" x2="195" y2="115" stroke="#8a4af3" strokeWidth="1"/>
            <line x1="175" y1="130" x2="195" y2="130" stroke="#8a4af3" strokeWidth="1"/>
            <line x1="175" y1="145" x2="195" y2="145" stroke="#8a4af3" strokeWidth="1"/>
            <line x1="175" y1="160" x2="195" y2="160" stroke="#8a4af3" strokeWidth="1"/>
          </svg>
        </div>

        {/* Text added as HTML for better rendering */}
        <div className="mt-4 text-center">
          <h3 className="text-[#8a4af3] text-2xl font-bold">HomeXpert</h3>
          <p className="text-gray-600 text-sm">Fresh Groceries Delivered</p>
        </div>
      </div>
    </div>
  );
};

export default GroceryBagImage;
