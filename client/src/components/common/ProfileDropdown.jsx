import React, { useState } from "react";
import Card from "./Card"; // Import the Card component

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white text-lg focus:outline-none cursor-pointer"
      >
        👤
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2">
          <Card /> 
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
