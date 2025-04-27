import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OtpVerification from './OtpVerification';
// Import assets
import mobileIllus from '../../assets/mobile-illus-new.svg';
import appStore from '../../assets/app-store-new.svg';
import playStore from '../../assets/play-store-new.svg';
import GroceryBagImage from '../../assets/grocery-bag-image';

const AuthModal = () => {
  const { authModalOpen, closeAuthModal, authMode, otpSent, switchAuthMode } = useAuth();

  if (!authModalOpen) return null;

  // Handle click outside to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAuthModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[700px] mx-4 overflow-hidden flex font-[Gilroy,arial,Helvetica_Neue,sans-serif] z-50 relative">
        {/* Left side - Image */}
        <div className="w-2/5 hidden md:block">
          <div className="h-full w-full bg-[#8a4af3] flex items-center justify-center p-4">
            <GroceryBagImage />
          </div>
        </div>

        {/* Right side - White background with form */}
        <div className="flex-1 p-4 relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {otpSent ? (
            <OtpVerification />
          ) : authMode === 'login' ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-center mt-6 mb-6">
                  <div className="bg-[#f0e6ff] rounded-full p-5">
                    <img
                      src={mobileIllus}
                      alt="Mobile App"
                      className="h-16 w-16"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-center text-[#8a4af3] mb-1">
                  Order faster & easier
                </h3>
                <p className="text-base text-center text-[#8a4af3] mb-1">
                  everytime
                </p>
                <p className="text-sm text-center text-gray-600 mb-6">
                  with the HomeXpert App
                </p>
                <LoginForm />
              </div>

              {/* App download buttons */}
              <div className="mt-4">
                <div className="flex justify-center gap-3">
                  <a href="#" className="block">
                    <img
                      src={appStore}
                      alt="Download on App Store"
                      className="h-8"
                    />
                  </a>
                  <a href="#" className="block">
                    <img
                      src={playStore}
                      alt="Get it on Google Play"
                      className="h-8"
                    />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-[#8a4af3] mb-6 md:mt-8">
                Create your HomeXpert account
              </h3>
              <RegisterForm />
            </div>
          )}

          {!otpSent && (
            <div className="mt-6 text-center">
              <p className="text-base text-gray-600">
                {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={switchAuthMode}
                  className="text-[#8a4af3] hover:underline font-semibold ml-1 text-base"
                >
                  {authMode === 'login' ? 'Register' : 'Login'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
