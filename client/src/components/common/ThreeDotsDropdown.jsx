import React, { useState } from "react";
import Card2 from "./Card2";
const ThreeDotsDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Three Dots Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 flex items-center justify-center text-violet-500 hover:text-violet-300 focus:outline-none cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-12 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6h.01M12 12h.01M12 18h.01"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2">
          <Card2 />
        </div>
      )}
    </div>
  );
};

export default ThreeDotsDropdown;

