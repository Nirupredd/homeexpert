import React, { useState } from "react";
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <div className="w-full">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0px_4px_10px_0px_rgba(138,74,243,0.3)] p-2 flex justify-between items-center">

        <Link
          to="/"
          className="text-primary-custom font-[1000] text-xl cursor-pointer px-2 transition-all duration-300 hover:scale-105 flex items-center"
          style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}
        >
          <span className="mr-1 text-primary-custom logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </span>
          <span className="gradient-text font-bold">HomeXpert</span>
        </Link>

        <div className="flex flex-grow justify-center space-x-8 ml-8">
          <SearchBar />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-cement hover:text-primary-custom focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <ul className="hidden lg:flex flex-grow justify-center space-x-8 ml-8" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
            <li className="text-cement font-[600] flex items-center space-x-1 cursor-pointer">
              <a href="#" className="text-primary-custom cursor-pointer flex items-center transition-all duration-300 hover:text-primary-custom hover:scale-105 nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Login
              </a>
            </li>
            <li className="text-cement font-[600] flex items-center space-x-1 cursor-pointer">
              <Link to="/cart" className="text-primary-custom cursor-pointer flex items-center transition-all duration-300 hover:text-primary-custom hover:scale-105 nav-link">
                <div className="relative flex items-center">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary-custom text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="ml-2">Cart</span>
                </div>
              </Link>
            </li>
            <li className="text-cement font-bold flex items-center space-x-2 cursor-pointer">
              <a href="#" className="text-primary-custom transition-all duration-300 hover:text-primary-custom hover:scale-105 nav-link font-bold">Work at HomeXpert</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[56px] inset-x-0 z-40 bg-white shadow-md py-3 px-4">
          <ul className="flex flex-col space-y-4" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
            <li className="text-cement font-[600] flex items-center space-x-1 cursor-pointer">
              <a href="#" className="text-primary-custom cursor-pointer flex items-center transition-all duration-300 hover:text-primary-custom hover:scale-105 nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Login
              </a>
            </li>
            <li className="text-cement font-[600] flex items-center space-x-1 cursor-pointer">
              <Link to="/cart" className="text-primary-custom cursor-pointer flex items-center transition-all duration-300 hover:text-primary-custom hover:scale-105 nav-link">
                <div className="relative flex items-center">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-primary-custom text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="ml-2">Cart</span>
                </div>
              </Link>
            </li>
            <li className="text-cement font-bold flex items-center space-x-2 cursor-pointer">
              <a href="#" className="text-primary-custom transition-all duration-300 hover:text-primary-custom hover:scale-105 nav-link font-bold">Work at HomeXpert</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;



