import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';
import SavedAddresses from './SavedAddresses';
import Favorites from './Favorites';
import { toast } from 'react-toastify';

const UserDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Redirect to home if not logged in
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!currentUser) {
    return null; // Don't render anything if not logged in
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <UserProfile />;
      case 'orders':
        return <OrderHistory />;
      case 'addresses':
        return <SavedAddresses />;
      case 'favorites':
        return <Favorites />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4 bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-6 border-b pb-4">
              <div className="w-12 h-12 rounded-full bg-primary-custom/20 flex items-center justify-center text-primary-custom font-bold text-xl">
                {currentUser.firstName ? currentUser.firstName.charAt(0) : ''}
                {currentUser.lastName ? currentUser.lastName.charAt(0) : ''}
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-gray-800">
                  {currentUser.firstName} {currentUser.lastName}
                </h3>
                <p className="text-sm text-gray-600">{currentUser.mobileNumber}</p>
              </div>
            </div>

            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'profile'
                        ? 'bg-primary-custom/10 text-primary-custom font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'orders'
                        ? 'bg-primary-custom/10 text-primary-custom font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    My Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'addresses'
                        ? 'bg-primary-custom/10 text-primary-custom font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Saved Addresses
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'favorites'
                        ? 'bg-primary-custom/10 text-primary-custom font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Favorites
                  </button>
                </li>
                <li className="pt-4 border-t mt-4">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-md flex items-center text-red-600 hover:bg-red-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 bg-white rounded-lg shadow-md p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
