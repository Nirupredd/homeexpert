import React from "react";
import ProfileDropdown from "./ProfileDropdown"; 
import ThreeDotsDropdown  from "./ThreeDotsDropdown";
function Header() {
  return (
    <div>
      <nav className="fixed w-full bg-white shadow-[0px_4px_10px_0px_rgba(139,92,246,0.3)] p-2 flex justify-between items-center">
        <a
          href="#"
          className="text-violet-600 font-[1000] text-lg cursor-pointer px-2"
        >
          HomeXpert
        </a>

        {/* Search Bar */}
        <div className="flex flex-grow justify-center space-x-8 ml-8">
          <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute w-5 h-5 top-3.5 left-3 text-violet-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197M16.803 15.803A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="border border-violet-300 rounded-lg shadow-sm px-10 py-2.5 text-slate-900 w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="hidden lg:flex items-center space-x-4">
          <ul className="hidden lg:flex flex-grow justify-center space-x-8 ml-8">
          <li className="font-[600] flex items-center space-x-1 cursor-pointer"> <ProfileDropdown /> </li>
          <li className="text-violet-900 font-[600] flex items-center space-x-1 cursor-pointer ">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6 text-violet-500"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.5l1.312 5.25m0 0L6.75 15.75h10.5l1.688-7.5m-13.875 0h13.875M10.5 21a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
    />
  </svg>
  <a href="#" className="text-violet-500 cursor-pointer">Cart</a>
</li>
<li className="text-violet-500 font-medium flex items-center space-x-2 cursor-pointer">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-violet-500"
  >
    <path d="M3 7h18" />
    <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
    <path d="M5 21h14" />
    <path d="M5 21V10" />
    <path d="M19 21V10" />
    <path d="M9 21v-8h6v8" />
  </svg>
  <a href="#" className="text-violet-500">Become a Seller</a>
</li>
<li className="font-[600] flex items-center space-x-1 cursor-pointer"><ThreeDotsDropdown/></li>
</ul>
    </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 6h16.5m-16.5 6h16.5"
              />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Header;



