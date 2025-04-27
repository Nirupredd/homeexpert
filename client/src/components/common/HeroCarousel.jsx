import React, { useState, useEffect } from 'react';

const HeroCarousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const handlePrevSlide = () => {
    const newIndex = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const handleNextSlide = () => {
    const newIndex = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-full md:h-[400px] overflow-hidden rounded-xl shadow-lg" style={{ touchAction: 'pan-y' }}>
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>

      {/* Left arrow button */}
      <button
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-2 md:p-3 rounded-full shadow-xl z-50 transition-all duration-300 cursor-pointer border border-gray-200 hover:scale-110 active:scale-95"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handlePrevSlide();
        }}
        onMouseDown={(e) => e.preventDefault()}
        aria-label="Previous slide"
        style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right arrow button */}
      <button
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-2 md:p-3 rounded-full shadow-xl z-50 transition-all duration-300 cursor-pointer border border-gray-200 hover:scale-110 active:scale-95"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleNextSlide();
        }}
        onMouseDown={(e) => e.preventDefault()}
        aria-label="Next slide"
        style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDotClick(index);
            }}
            onMouseDown={(e) => e.preventDefault()}
            className={`h-3 md:h-4 rounded-full transition-all duration-300 cursor-pointer shadow-md border border-gray-200 ${index === currentSlide ? 'bg-primary-custom w-8 md:w-10' : 'bg-white w-3 md:w-4 hover:bg-gray-100 hover:scale-110'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
