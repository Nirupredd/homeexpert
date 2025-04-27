import React from 'react';
import { Link } from 'react-router-dom';

// Slide 1: Fresh Produce
const FreshProduceSlide = () => (
  <div className="relative h-full w-full flex flex-col justify-center p-8 bg-gradient-to-r from-primary-custom/5 to-primary-custom/20">
    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent z-0"></div>
    <div className="flex flex-col md:flex-row items-center justify-between h-full">
      <div className="max-w-xl z-10 relative opacity-100 transition-opacity duration-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-[fadeIn_0.8s_ease-out]" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          Fresh Products Delivered to Your Doorstep
        </h1>
        <p className="text-cement mb-6 text-lg animate-[fadeIn_1s_ease-out]" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          Shop from a wide range of fresh vegetables, fruits, and grocery items.
          Get them delivered right to your home.
        </p>
        <Link to="/products" className="bg-primary-custom hover:bg-opacity-80 hover:shadow-md text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:scale-105 flex items-center animate-[fadeIn_1.2s_ease-out]">
          <span>Shop Now</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center transition-transform duration-500 hover:scale-105 animate-[fadeIn_1.5s_ease-out]">
        <img
          src="https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3JvY2VyeSUyMGRlbGl2ZXJ5JTIwdmVnZXRhYmxlc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt="Fresh fruits and vegetables delivery"
          className="rounded-lg shadow-md max-w-full h-auto object-cover"
          style={{ maxHeight: '300px' }}
          loading="eager"
        />
      </div>
    </div>
    <div className="absolute w-40 h-40 -bottom-10 -right-10 rounded-full bg-primary-custom/10 z-0 animate-pulse"></div>
    <div className="absolute w-40 h-40 -top-10 -left-10 rounded-full bg-primary-custom/10 z-0 animate-pulse"></div>
  </div>
);

// Slide 2: Organic Selection
const OrganicSelectionSlide = () => (
  <div className="relative h-full w-full flex flex-col justify-center p-8 bg-gradient-to-r from-green-50 to-green-100">
    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent z-0"></div>
    <div className="flex flex-col md:flex-row items-center justify-between h-full">
      <div className="max-w-xl z-10 relative opacity-100 transition-opacity duration-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-[fadeIn_0.8s_ease-out]" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          Organic Selection for Healthy Living
        </h1>
        <p className="text-cement mb-6 text-lg animate-[fadeIn_1s_ease-out]" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          Discover our premium range of organic fruits and vegetables.
          Grown without pesticides for a healthier lifestyle.
        </p>
        <Link to="/products?category=organic" className="bg-green-600 hover:bg-green-700 hover:shadow-md text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:scale-105 flex items-center animate-[fadeIn_1.2s_ease-out]">
          <span>Explore Organic</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center transition-transform duration-500 hover:scale-105 animate-[fadeIn_1.5s_ease-out]">
        <img
          src="https://images.unsplash.com/photo-1574955598898-d105479382e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGdyb2NlcnklMjBkZWxpdmVyeSUyMHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
          alt="Organic vegetables and fruits"
          className="rounded-lg shadow-md max-w-full h-auto object-cover"
          style={{ maxHeight: '300px' }}
          loading="eager"
        />
      </div>
    </div>
    <div className="absolute w-40 h-40 -bottom-10 -right-10 rounded-full bg-green-200/30 z-0 animate-pulse"></div>
    <div className="absolute w-40 h-40 -top-10 -left-10 rounded-full bg-green-200/30 z-0 animate-pulse"></div>
  </div>
);

// Slide 3: Fast Delivery
const FastDeliverySlide = () => (
  <div className="relative h-full w-full flex flex-col justify-center p-8 bg-gradient-to-r from-primary-custom/5 to-primary-custom/20">
    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent z-0"></div>
    <div className="flex flex-col md:flex-row items-center justify-between h-full">
      <div className="max-w-xl z-10 relative opacity-100 transition-opacity duration-300">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-[fadeIn_0.8s_ease-out]" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          Fast Delivery to Your Home
        </h1>
        <p className="text-cement mb-6 text-lg animate-[fadeIn_1s_ease-out]" style={{ fontFamily: 'Gilroy, Arial, Helvetica Neue, sans-serif' }}>
          Order before noon for same-day delivery.
          Fresh groceries at your doorstep within hours.
        </p>
        <Link to="/products" className="bg-primary-custom hover:bg-opacity-80 hover:shadow-md text-white px-6 py-3 rounded-md font-medium transition-all duration-300 hover:scale-105 flex items-center animate-[fadeIn_1.2s_ease-out]">
          <span>Order Now</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
      <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center transition-transform duration-500 hover:scale-105 animate-[fadeIn_1.5s_ease-out]">
        <img
          src="https://images.unsplash.com/photo-1706605212111-cb4426970ab8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyb2NlcnklMjBkZWxpdmVyeSUyMHZlZ2V0YWJsZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
          alt="Fast grocery delivery"
          className="rounded-lg shadow-md max-w-full h-auto object-cover"
          style={{ maxHeight: '300px' }}
          loading="eager"
        />
      </div>
    </div>
    <div className="absolute w-40 h-40 -bottom-10 -right-10 rounded-full bg-primary-custom/10 z-0 animate-pulse"></div>
    <div className="absolute w-40 h-40 -top-10 -left-10 rounded-full bg-primary-custom/10 z-0 animate-pulse"></div>
  </div>
);

// Export all slides
export const heroSlides = [
  <FreshProduceSlide key="fresh-produce" />,
  <OrganicSelectionSlide key="organic-selection" />,
  <FastDeliverySlide key="fast-delivery" />
];

export default heroSlides;
